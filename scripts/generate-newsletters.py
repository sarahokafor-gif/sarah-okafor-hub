#!/usr/bin/env python3
"""
Generate professional legal newsletter PDFs with dynamic RSS content.

This script reads newsletter configuration from config/newsletter-feeds.json
and generates PDFs for each practice area with live RSS feed content.

Usage:
    python scripts/generate-newsletters.py

Dependencies:
    pip install reportlab requests
"""

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote

import requests
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.pdfgen import canvas


# Get script directory and project root
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
CONFIG_PATH = PROJECT_ROOT / "config" / "newsletter-feeds.json"


def get_iso_week():
    """Get current ISO week number and year."""
    now = datetime.now(timezone.utc)
    iso_cal = now.isocalendar()
    return iso_cal.week, iso_cal.year


def load_config():
    """Load newsletter configuration from JSON file."""
    if not CONFIG_PATH.exists():
        print(f"Error: Config file not found at {CONFIG_PATH}")
        sys.exit(1)

    with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def fetch_rss_feed(url, timeout=10, max_items=5):
    """
    Fetch RSS feed via rss2json API.

    Returns list of feed items or empty list on failure.
    """
    rss2json_api = "https://api.rss2json.com/v1/api.json?rss_url="

    try:
        response = requests.get(
            rss2json_api + quote(url, safe=''),
            timeout=timeout
        )
        response.raise_for_status()
        data = response.json()

        if data.get('status') == 'ok':
            items = data.get('items', [])[:max_items]
            return [
                {
                    'title': item.get('title', 'Untitled'),
                    'link': item.get('link', ''),
                    'pubDate': item.get('pubDate', '')[:10] if item.get('pubDate') else ''
                }
                for item in items
            ]
    except requests.RequestException as e:
        print(f"  Warning: Failed to fetch {url}: {e}")
    except (json.JSONDecodeError, KeyError) as e:
        print(f"  Warning: Failed to parse feed from {url}: {e}")

    return []


def get_custom_styles():
    """Create custom paragraph styles for newsletters."""
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(
        name='NewsletterTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='NewsletterSubtitle',
        fontName='Helvetica',
        fontSize=12,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=12
    ))

    styles.add(ParagraphStyle(
        name='SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=14,
        textColor=HexColor('#1e3a5f'),
        spaceBefore=16,
        spaceAfter=8
    ))

    styles.add(ParagraphStyle(
        name='SubHeading',
        fontName='Helvetica-Bold',
        fontSize=11,
        textColor=HexColor('#333333'),
        spaceBefore=12,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='NewsletterBody',
        fontName='Helvetica',
        fontSize=10,
        textColor=HexColor('#333333'),
        alignment=TA_JUSTIFY,
        spaceAfter=8,
        leading=14
    ))

    styles.add(ParagraphStyle(
        name='BulletText',
        fontName='Helvetica',
        fontSize=10,
        textColor=HexColor('#333333'),
        leftIndent=20,
        spaceAfter=4,
        leading=14
    ))

    styles.add(ParagraphStyle(
        name='CaseRef',
        fontName='Helvetica-Oblique',
        fontSize=10,
        textColor=HexColor('#555555'),
        spaceAfter=4
    ))

    styles.add(ParagraphStyle(
        name='FeedItem',
        fontName='Helvetica',
        fontSize=9,
        textColor=HexColor('#444444'),
        leftIndent=20,
        spaceAfter=3,
        leading=12
    ))

    styles.add(ParagraphStyle(
        name='FeedDate',
        fontName='Helvetica',
        fontSize=8,
        textColor=HexColor('#888888'),
        leftIndent=20,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='Footer',
        fontName='Helvetica',
        fontSize=8,
        textColor=HexColor('#666666'),
        alignment=TA_CENTER
    ))

    styles.add(ParagraphStyle(
        name='NoContent',
        fontName='Helvetica-Oblique',
        fontSize=9,
        textColor=HexColor('#999999'),
        leftIndent=20,
        spaceAfter=8
    ))

    return styles


class NumberedCanvas(canvas.Canvas):
    """Canvas that adds page numbers and footer."""

    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        width, height = A4
        self.setFont('Helvetica', 8)
        self.setFillColor(HexColor('#666666'))
        self.drawCentredString(
            width / 2, 0.5 * inch,
            f"Page {self._pageNumber} of {page_count} | Chambers of Sarah Okafor | www.sarahokafor.com"
        )


def create_header_table(title, subtitle, color):
    """Create a colored header block."""
    styles = get_custom_styles()

    header_data = [
        [Paragraph(title, styles['NewsletterTitle'])],
        [Paragraph(subtitle, styles['NewsletterSubtitle'])]
    ]

    header_table = Table(header_data, colWidths=[6.5 * inch])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor(color)),
        ('TOPPADDING', (0, 0), (-1, 0), 20),
        ('BOTTOMPADDING', (0, -1), (-1, -1), 20),
        ('LEFTPADDING', (0, 0), (-1, -1), 20),
        ('RIGHTPADDING', (0, 0), (-1, -1), 20),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    return header_table


def generate_newsletter(newsletter_config, week, year, output_dir, settings):
    """
    Generate a single newsletter PDF.

    Args:
        newsletter_config: Dictionary with newsletter configuration
        week: ISO week number
        year: Year
        output_dir: Output directory path
        settings: Global settings from config
    """
    nl = newsletter_config
    nl_id = nl['id']
    name = nl['name']
    color = nl['color']
    description = nl['description']
    topics = nl['topics']
    feeds = nl['feeds']
    static_content = nl['staticContent']

    # Generate filename with proper title case
    # Keep small words lowercase except at start
    small_words = {'of', 'and', 'the', 'in', 'on', 'at', 'for', 'to'}
    parts = nl_id.split('-')
    title_parts = []
    for i, p in enumerate(parts):
        if i == 0 or p.lower() not in small_words:
            title_parts.append(p.capitalize())
        else:
            title_parts.append(p.lower())
    filename = f"{'-'.join(title_parts)}-Legal-Update-Week-{week}-{year}.pdf"

    filepath = output_dir / filename

    print(f"\nGenerating: {name}")
    print(f"  File: {filename}")

    # Fetch RSS feeds
    print(f"  Fetching case law feeds...")
    case_law_items = []
    for feed in feeds.get('caseLaw', []):
        items = fetch_rss_feed(
            feed['url'],
            timeout=settings.get('feedTimeout', 10),
            max_items=settings.get('maxItemsPerFeed', 5)
        )
        if items:
            case_law_items.append({
                'source': feed['name'],
                'items': items
            })

    print(f"  Fetching news feeds...")
    news_items = []
    for feed in feeds.get('news', []):
        items = fetch_rss_feed(
            feed['url'],
            timeout=settings.get('feedTimeout', 10),
            max_items=settings.get('maxItemsPerFeed', 5)
        )
        if items:
            news_items.append({
                'source': feed['name'],
                'items': items
            })

    # Create PDF
    doc = SimpleDocTemplate(
        str(filepath),
        pagesize=A4,
        rightMargin=0.75 * inch,
        leftMargin=0.75 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.75 * inch
    )

    styles = get_custom_styles()
    story = []

    # Header
    story.append(create_header_table(
        name,
        f"Legal Update | Week {week}, {year}",
        color
    ))
    story.append(Spacer(1, 20))

    # Introduction
    story.append(Paragraph("Introduction", styles['SectionHeading']))
    story.append(Paragraph(
        f"This weekly legal update provides practitioners with the latest developments "
        f"in {name.lower()}. It includes recent case law, news updates, key legislation "
        f"references, and useful resources for legal professionals.",
        styles['NewsletterBody']
    ))
    story.append(Paragraph(
        f"<b>Focus areas:</b> {description}",
        styles['NewsletterBody']
    ))

    # Topics covered
    story.append(Paragraph("This Week's Coverage", styles['SubHeading']))
    for topic in topics:
        story.append(Paragraph(f"• {topic}", styles['BulletText']))

    # Recent Case Law section
    story.append(Paragraph("Recent Case Law", styles['SectionHeading']))

    if case_law_items:
        for source_data in case_law_items:
            story.append(Paragraph(source_data['source'], styles['SubHeading']))
            for item in source_data['items']:
                # Truncate long titles
                title = item['title']
                if len(title) > 100:
                    title = title[:97] + "..."
                story.append(Paragraph(f"• {title}", styles['FeedItem']))
                if item['pubDate']:
                    story.append(Paragraph(f"  Published: {item['pubDate']}", styles['FeedDate']))
    else:
        story.append(Paragraph(
            "Unable to fetch recent case law at this time. Please check BAILII directly for updates.",
            styles['NoContent']
        ))

    # News & Commentary section
    story.append(Paragraph("News & Commentary", styles['SectionHeading']))

    if news_items:
        for source_data in news_items:
            story.append(Paragraph(source_data['source'], styles['SubHeading']))
            for item in source_data['items']:
                title = item['title']
                if len(title) > 100:
                    title = title[:97] + "..."
                story.append(Paragraph(f"• {title}", styles['FeedItem']))
                if item['pubDate']:
                    story.append(Paragraph(f"  Published: {item['pubDate']}", styles['FeedDate']))
    else:
        story.append(Paragraph(
            "Unable to fetch news updates at this time. Please check the relevant sources directly.",
            styles['NoContent']
        ))

    # Key Legislation
    story.append(Paragraph("Key Legislation", styles['SectionHeading']))
    for leg in static_content.get('keyLegislation', []):
        story.append(Paragraph(f"• {leg}", styles['BulletText']))

    # Useful Resources
    story.append(Paragraph("Useful Resources", styles['SectionHeading']))
    for res in static_content.get('resources', []):
        story.append(Paragraph(f"• {res}", styles['BulletText']))

    # Footer
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cccccc')))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "This document is for general information only and does not constitute legal advice. "
        "For specific legal advice, please consult a qualified legal professional.",
        styles['Footer']
    ))
    story.append(Paragraph(
        f"Prepared by Sarah Okafor, Barrister | Chambers of Sarah Okafor | Week {week}, {year}",
        styles['Footer']
    ))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"  Created successfully")

    return filename


def main():
    """Main entry point."""
    print("=" * 60)
    print("Legal Newsletter Generator")
    print("=" * 60)

    # Get current week
    week, year = get_iso_week()
    print(f"\nGenerating newsletters for Week {week}, {year}")

    # Load configuration
    print(f"\nLoading config from: {CONFIG_PATH}")
    config = load_config()

    newsletters = config.get('newsletters', [])
    settings = config.get('settings', {})

    print(f"Found {len(newsletters)} newsletters to generate")

    # Create output directory
    output_dir = PROJECT_ROOT / settings.get('outputDir', 'public/newsletters')
    output_dir.mkdir(parents=True, exist_ok=True)
    print(f"Output directory: {output_dir}")

    # Generate each newsletter
    generated = []
    for nl in newsletters:
        try:
            filename = generate_newsletter(nl, week, year, output_dir, settings)
            generated.append(filename)
        except Exception as e:
            print(f"  Error generating {nl['name']}: {e}")
            import traceback
            traceback.print_exc()

    # Summary
    print("\n" + "=" * 60)
    print(f"Generation complete: {len(generated)}/{len(newsletters)} newsletters created")
    print("=" * 60)

    if generated:
        print("\nGenerated files:")
        for f in generated:
            print(f"  - {f}")

    return 0 if len(generated) == len(newsletters) else 1


if __name__ == "__main__":
    sys.exit(main())
