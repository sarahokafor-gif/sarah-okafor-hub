#!/usr/bin/env python3
"""
Generate professional legal newsletter PDFs for each practice area.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
import os

# Output directory
OUTPUT_DIR = "/Users/sarahokafor/Documents/GitHub/sarah-okafor-hub/public/newsletters"

# Custom styles
def get_custom_styles():
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
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='Footer',
        fontName='Helvetica',
        fontSize=8,
        textColor=HexColor('#666666'),
        alignment=TA_CENTER
    ))

    return styles


class NumberedCanvas(canvas.Canvas):
    """Canvas that adds page numbers and header."""

    def __init__(self, *args, header_color='#1e3a5f', title='Legal Update', **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []
        self.header_color = header_color
        self.title = title

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
        self.drawCentredString(width / 2, 0.5 * inch,
            f"Page {self._pageNumber} of {page_count} | Chambers of Sarah Okafor | www.sarahokafor.com")


def create_header_table(title, subtitle, color):
    """Create a colored header block."""
    from reportlab.platypus import Table, TableStyle

    styles = get_custom_styles()

    header_data = [[
        Paragraph(title, styles['NewsletterTitle']),
    ], [
        Paragraph(subtitle, styles['NewsletterSubtitle']),
    ]]

    header_table = Table(header_data, colWidths=[6.5*inch])
    header_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), HexColor(color)),
        ('TOPPADDING', (0, 0), (-1, 0), 20),
        ('BOTTOMPADDING', (0, -1), (-1, -1), 20),
        ('LEFTPADDING', (0, 0), (-1, -1), 20),
        ('RIGHTPADDING', (0, 0), (-1, -1), 20),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))

    return header_table


def generate_cop_newsletter():
    """Generate Court of Protection newsletter."""
    filename = os.path.join(OUTPUT_DIR, "Court-of-Protection-Legal-Update-January-2026.pdf")
    doc = SimpleDocTemplate(filename, pagesize=A4,
                           rightMargin=0.75*inch, leftMargin=0.75*inch,
                           topMargin=0.75*inch, bottomMargin=0.75*inch)

    styles = get_custom_styles()
    story = []

    # Header
    story.append(create_header_table(
        "Court of Protection",
        "Legal Update | January 2026",
        "#1e3a5f"
    ))
    story.append(Spacer(1, 20))

    # Introduction
    story.append(Paragraph("Introduction", styles['SectionHeading']))
    story.append(Paragraph(
        "This legal update provides practitioners with a comprehensive overview of the Court of Protection "
        "framework, recent developments in case law, and practical guidance for applications under the "
        "Mental Capacity Act 2005. It is intended as a reference document for legal professionals, local "
        "authority lawyers, and social workers involved in capacity and welfare matters.",
        styles['NewsletterBody']
    ))

    # Key Legislation
    story.append(Paragraph("Key Legislation", styles['SectionHeading']))
    story.append(Paragraph("Mental Capacity Act 2005", styles['SubHeading']))
    story.append(Paragraph(
        "The Mental Capacity Act 2005 (MCA) provides the statutory framework for decision-making on behalf "
        "of adults who lack capacity. The Act establishes five key principles that must be applied in all "
        "decisions:",
        styles['NewsletterBody']
    ))

    principles = [
        "A person must be assumed to have capacity unless it is established that they lack capacity (s.1(2))",
        "A person is not to be treated as unable to make a decision unless all practicable steps to help them have been taken without success (s.1(3))",
        "A person is not to be treated as unable to make a decision merely because they make an unwise decision (s.1(4))",
        "An act or decision made under the Act must be done in the person's best interests (s.1(5))",
        "Before an act is done, regard must be had to whether the purpose can be achieved in a way that is less restrictive of the person's rights and freedom of action (s.1(6))"
    ]

    for p in principles:
        story.append(Paragraph(f"• {p}", styles['BulletText']))

    story.append(Spacer(1, 8))

    # Capacity Assessment
    story.append(Paragraph("The Capacity Test", styles['SubHeading']))
    story.append(Paragraph(
        "Section 2 of the MCA provides that a person lacks capacity in relation to a matter if, at the material "
        "time, they are unable to make a decision for themselves in relation to the matter because of an "
        "impairment of, or a disturbance in the functioning of, the mind or brain (the 'diagnostic test').",
        styles['NewsletterBody']
    ))
    story.append(Paragraph(
        "Section 3 sets out when a person is unable to make a decision (the 'functional test'). A person is "
        "unable to make a decision if they are unable to:",
        styles['NewsletterBody']
    ))

    functional = [
        "Understand the information relevant to the decision",
        "Retain that information",
        "Use or weigh that information as part of the process of making the decision",
        "Communicate their decision (by any means)"
    ]
    for f in functional:
        story.append(Paragraph(f"• {f}", styles['BulletText']))

    # Deprivation of Liberty
    story.append(Paragraph("Deprivation of Liberty", styles['SectionHeading']))
    story.append(Paragraph(
        "Following the Supreme Court decision in Cheshire West [2014] UKSC 19, a person is deprived of their "
        "liberty if they are under continuous supervision and control and are not free to leave, and the person "
        "lacks capacity to consent to their care arrangements. The 'acid test' applies regardless of the "
        "person's compliance or the purpose of the placement.",
        styles['NewsletterBody']
    ))
    story.append(Paragraph(
        "For community settings (supported living, shared lives, domestic settings), applications must be made "
        "to the Court of Protection using the COPDOL11 streamlined procedure where all parties agree the "
        "arrangements are in P's best interests.",
        styles['NewsletterBody']
    ))

    # Recent Case Law
    story.append(Paragraph("Recent Case Law", styles['SectionHeading']))

    cases = [
        ("Re AB [2023] EWCOP 45", "Confirmed that the Court must consider the least restrictive option and that family contact should not be restricted without proper justification."),
        ("A Local Authority v JB [2021] UKSC 52", "The Supreme Court held that a person can consent to sexual relations even if they do not understand that their partner may have a sexually transmitted infection."),
        ("Barnsley MBC v GS [2024] EWCOP 12", "Emphasised the importance of proper consultation with P and family members before making welfare decisions."),
    ]

    for case, summary in cases:
        story.append(Paragraph(case, styles['CaseRef']))
        story.append(Paragraph(summary, styles['NewsletterBody']))

    # Practical Guidance
    story.append(Paragraph("Practical Guidance", styles['SectionHeading']))
    story.append(Paragraph("COPDOL11 Applications", styles['SubHeading']))
    story.append(Paragraph(
        "The COPDOL11 procedure is used for community deprivation of liberty applications where all parties "
        "agree the arrangements are in P's best interests. Required documents include:",
        styles['NewsletterBody']
    ))

    docs = [
        "COPDOL11 Application Form (pages 1-5)",
        "Annex A - Evidence in Support",
        "Annex B - Consultation with Interested Persons",
        "Annex C - Consultation with P",
        "COP3 - Assessment of Capacity (Parts A and B)",
        "Best Interests Assessment in Domestic Setting",
        "Care and Support Plan (signed and dated)"
    ]
    for d in docs:
        story.append(Paragraph(f"• {d}", styles['BulletText']))

    # Resources
    story.append(Paragraph("Useful Resources", styles['SectionHeading']))
    resources = [
        "legislation.gov.uk - Mental Capacity Act 2005",
        "GOV.UK - MCA Code of Practice",
        "GOV.UK - Court of Protection Forms",
        "BAILII - EWCOP case law",
        "39 Essex Chambers - Mental Capacity Law Newsletter"
    ]
    for r in resources:
        story.append(Paragraph(f"• {r}", styles['BulletText']))

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
        "Prepared by Sarah Okafor, Barrister | Chambers of Sarah Okafor | January 2026",
        styles['Footer']
    ))

    doc.build(story)
    print(f"Created: {filename}")


def generate_asc_newsletter():
    """Generate Adult Social Care newsletter."""
    filename = os.path.join(OUTPUT_DIR, "Adult-Social-Care-Legal-Update-January-2026.pdf")
    doc = SimpleDocTemplate(filename, pagesize=A4,
                           rightMargin=0.75*inch, leftMargin=0.75*inch,
                           topMargin=0.75*inch, bottomMargin=0.75*inch)

    styles = get_custom_styles()
    story = []

    # Header
    story.append(create_header_table(
        "Adult Social Care",
        "Legal Update | January 2026",
        "#2d5a3d"
    ))
    story.append(Spacer(1, 20))

    # Introduction
    story.append(Paragraph("Introduction", styles['SectionHeading']))
    story.append(Paragraph(
        "This legal update provides an overview of the adult social care legal framework in England, "
        "focusing on the Care Act 2014, section 117 aftercare, safeguarding duties, and ordinary residence. "
        "It is intended for local authority lawyers, social workers, and legal professionals working in "
        "adult social care.",
        styles['NewsletterBody']
    ))

    # Care Act 2014
    story.append(Paragraph("Care Act 2014 - Key Duties", styles['SectionHeading']))

    story.append(Paragraph("Duty to Assess (s.9)", styles['SubHeading']))
    story.append(Paragraph(
        "Where it appears to a local authority that an adult may have needs for care and support, the "
        "authority must assess whether the adult does have needs, and if so, what those needs are. This "
        "duty applies regardless of the authority's view of the level of need or the adult's financial "
        "resources.",
        styles['NewsletterBody']
    ))

    story.append(Paragraph("Eligibility Criteria (s.13)", styles['SubHeading']))
    story.append(Paragraph(
        "An adult's needs meet the eligibility criteria if: (a) the needs arise from or are related to a "
        "physical or mental impairment or illness; (b) as a result of the needs, the adult is unable to "
        "achieve two or more specified outcomes; and (c) as a consequence, there is a significant impact "
        "on the adult's wellbeing.",
        styles['NewsletterBody']
    ))

    story.append(Paragraph("Duty to Meet Needs (s.18)", styles['SubHeading']))
    story.append(Paragraph(
        "A local authority must meet an adult's needs for care and support which meet the eligibility "
        "criteria if the adult is ordinarily resident in the authority's area (or present and of no settled "
        "residence) and the adult's financial resources are below the financial limit or the authority is "
        "satisfied it is not appropriate to require payment.",
        styles['NewsletterBody']
    ))

    # Section 117
    story.append(Paragraph("Section 117 MHA Aftercare", styles['SectionHeading']))
    story.append(Paragraph(
        "Section 117 of the Mental Health Act 1983 imposes a joint duty on the ICB and local authority to "
        "provide aftercare services to persons who have been detained under sections 3, 37, 45A, 47 or 48 "
        "of the MHA. Key points:",
        styles['NewsletterBody']
    ))

    s117_points = [
        "Aftercare cannot be charged for (s.117(3))",
        "Duty continues until both authorities are satisfied the person no longer needs services",
        "Ordinary residence is determined by where the person was resident before detention",
        "Services must reduce the risk of mental disorder worsening and/or readmission"
    ]
    for p in s117_points:
        story.append(Paragraph(f"• {p}", styles['BulletText']))

    # Safeguarding
    story.append(Paragraph("Safeguarding Adults", styles['SectionHeading']))
    story.append(Paragraph(
        "Section 42 of the Care Act 2014 requires a local authority to make enquiries (or cause enquiries "
        "to be made) where it has reasonable cause to suspect that an adult in its area: (a) has needs for "
        "care and support; (b) is experiencing, or is at risk of, abuse or neglect; and (c) as a result of "
        "those needs is unable to protect themselves.",
        styles['NewsletterBody']
    ))

    # Ordinary Residence
    story.append(Paragraph("Ordinary Residence", styles['SectionHeading']))
    story.append(Paragraph(
        "Ordinary residence determines which local authority is responsible for meeting an adult's care "
        "needs. The key principles from R (Cornwall Council) v Secretary of State [2015] UKSC 46 are:",
        styles['NewsletterBody']
    ))

    or_points = [
        "Ordinary residence is to be given its natural and ordinary meaning",
        "A person can have more than one ordinary residence",
        "Residence must be adopted voluntarily and for settled purposes",
        "The deeming provisions in s.39 apply to specified accommodation"
    ]
    for p in or_points:
        story.append(Paragraph(f"• {p}", styles['BulletText']))

    # Resources
    story.append(Paragraph("Useful Resources", styles['SectionHeading']))
    resources = [
        "legislation.gov.uk - Care Act 2014",
        "GOV.UK - Care and Support Statutory Guidance",
        "SCIE - Social Care Institute for Excellence",
        "Skills for Care - Workforce development resources",
        "ADASS - Association of Directors of Adult Social Services"
    ]
    for r in resources:
        story.append(Paragraph(f"• {r}", styles['BulletText']))

    # Footer
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cccccc')))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "This document is for general information only and does not constitute legal advice.",
        styles['Footer']
    ))
    story.append(Paragraph(
        "Prepared by Sarah Okafor, Barrister | Chambers of Sarah Okafor | January 2026",
        styles['Footer']
    ))

    doc.build(story)
    print(f"Created: {filename}")


def generate_family_newsletter():
    """Generate Family Law newsletter."""
    filename = os.path.join(OUTPUT_DIR, "Family-Law-Legal-Update-January-2026.pdf")
    doc = SimpleDocTemplate(filename, pagesize=A4,
                           rightMargin=0.75*inch, leftMargin=0.75*inch,
                           topMargin=0.75*inch, bottomMargin=0.75*inch)

    styles = get_custom_styles()
    story = []

    # Header
    story.append(create_header_table(
        "Family Law",
        "Legal Update | January 2026",
        "#7c3aed"
    ))
    story.append(Spacer(1, 20))

    # Introduction
    story.append(Paragraph("Introduction", styles['SectionHeading']))
    story.append(Paragraph(
        "This legal update covers key aspects of family law in England and Wales, including the Children "
        "Act 1989, public and private law proceedings, financial remedies, and domestic abuse. It is "
        "intended as a reference for family law practitioners and professionals.",
        styles['NewsletterBody']
    ))

    # Children Act
    story.append(Paragraph("Children Act 1989", styles['SectionHeading']))

    story.append(Paragraph("The Welfare Principle (s.1)", styles['SubHeading']))
    story.append(Paragraph(
        "When a court determines any question with respect to the upbringing of a child, the child's "
        "welfare shall be the court's paramount consideration. The welfare checklist in s.1(3) includes:",
        styles['NewsletterBody']
    ))

    welfare = [
        "The ascertainable wishes and feelings of the child (in light of their age and understanding)",
        "The child's physical, emotional and educational needs",
        "The likely effect of any change in circumstances",
        "The child's age, sex, background and relevant characteristics",
        "Any harm the child has suffered or is at risk of suffering",
        "The capability of parents and others to meet the child's needs",
        "The range of powers available to the court"
    ]
    for w in welfare:
        story.append(Paragraph(f"• {w}", styles['BulletText']))

    story.append(Paragraph("Section 8 Orders", styles['SubHeading']))
    story.append(Paragraph(
        "The court may make the following orders under section 8: Child Arrangements Orders (replacing "
        "residence and contact orders), Specific Issue Orders, and Prohibited Steps Orders. The no order "
        "principle in s.1(5) provides that the court shall not make an order unless it considers that "
        "doing so would be better for the child than making no order.",
        styles['NewsletterBody']
    ))

    # Public Law
    story.append(Paragraph("Public Law Proceedings", styles['SectionHeading']))
    story.append(Paragraph(
        "Care and supervision proceedings are governed by Part IV of the Children Act 1989. The threshold "
        "criteria in s.31(2) require the court to be satisfied that: (a) the child is suffering, or is "
        "likely to suffer, significant harm; and (b) the harm is attributable to the care given to the "
        "child not being what it would be reasonable to expect a parent to give, or the child being "
        "beyond parental control.",
        styles['NewsletterBody']
    ))

    # Domestic Abuse
    story.append(Paragraph("Domestic Abuse Act 2021", styles['SectionHeading']))
    story.append(Paragraph(
        "The Domestic Abuse Act 2021 introduced a statutory definition of domestic abuse, covering "
        "physical or sexual abuse, violent or threatening behaviour, controlling or coercive behaviour, "
        "economic abuse, psychological, emotional or other abuse. The Act recognises that children who "
        "see, hear or experience the effects of domestic abuse are also victims.",
        styles['NewsletterBody']
    ))

    # Resources
    story.append(Paragraph("Useful Resources", styles['SectionHeading']))
    resources = [
        "legislation.gov.uk - Children Act 1989",
        "GOV.UK - Family Court forms",
        "CAFCASS - Children and Family Court Advisory Service",
        "Family Justice Council Guidance",
        "Resolution - Family Law practitioners"
    ]
    for r in resources:
        story.append(Paragraph(f"• {r}", styles['BulletText']))

    # Footer
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cccccc')))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "This document is for general information only and does not constitute legal advice.",
        styles['Footer']
    ))
    story.append(Paragraph(
        "Prepared by Sarah Okafor, Barrister | Chambers of Sarah Okafor | January 2026",
        styles['Footer']
    ))

    doc.build(story)
    print(f"Created: {filename}")


def generate_private_client_newsletter():
    """Generate Private Client newsletter."""
    filename = os.path.join(OUTPUT_DIR, "Private-Client-Legal-Update-January-2026.pdf")
    doc = SimpleDocTemplate(filename, pagesize=A4,
                           rightMargin=0.75*inch, leftMargin=0.75*inch,
                           topMargin=0.75*inch, bottomMargin=0.75*inch)

    styles = get_custom_styles()
    story = []

    # Header
    story.append(create_header_table(
        "Private Client & Chancery",
        "Legal Update | January 2026",
        "#5a3d2d"
    ))
    story.append(Spacer(1, 20))

    # Introduction
    story.append(Paragraph("Introduction", styles['SectionHeading']))
    story.append(Paragraph(
        "This legal update covers key aspects of private client and chancery work, including wills and "
        "probate, Lasting Powers of Attorney, trusts, and estate administration. It is intended for "
        "private client practitioners and professionals advising on these matters.",
        styles['NewsletterBody']
    ))

    # LPAs
    story.append(Paragraph("Lasting Powers of Attorney", styles['SectionHeading']))
    story.append(Paragraph(
        "A Lasting Power of Attorney (LPA) is a legal document that allows a person (the donor) to appoint "
        "one or more people (attorneys) to make decisions on their behalf. There are two types:",
        styles['NewsletterBody']
    ))

    story.append(Paragraph("Property and Financial Affairs LPA", styles['SubHeading']))
    story.append(Paragraph(
        "This allows attorneys to make decisions about the donor's property and finances, including "
        "managing bank accounts, paying bills, collecting benefits, and selling property. It can be used "
        "while the donor still has capacity (if they choose) or only when they lose capacity.",
        styles['NewsletterBody']
    ))

    story.append(Paragraph("Health and Welfare LPA", styles['SubHeading']))
    story.append(Paragraph(
        "This allows attorneys to make decisions about the donor's healthcare, medical treatment, and "
        "daily care. It can only be used when the donor lacks capacity to make the specific decision. "
        "It can include decisions about life-sustaining treatment if specified.",
        styles['NewsletterBody']
    ))

    # Probate
    story.append(Paragraph("Probate and Estate Administration", styles['SectionHeading']))
    story.append(Paragraph(
        "Probate is the legal process of administering a deceased person's estate. Key steps include:",
        styles['NewsletterBody']
    ))

    probate_steps = [
        "Locating and valuing all assets and liabilities",
        "Applying for a Grant of Probate (if there is a will) or Letters of Administration (if intestate)",
        "Paying inheritance tax (if applicable) and any debts",
        "Distributing the estate according to the will or intestacy rules"
    ]
    for p in probate_steps:
        story.append(Paragraph(f"• {p}", styles['BulletText']))

    # Inheritance Act
    story.append(Paragraph("Inheritance (Provision for Family and Dependants) Act 1975", styles['SectionHeading']))
    story.append(Paragraph(
        "The Inheritance Act allows certain categories of people to apply to the court for reasonable "
        "financial provision from a deceased's estate if they believe they have not been adequately "
        "provided for. Applicants must fall within specified categories including spouses, former "
        "spouses, children, and dependants.",
        styles['NewsletterBody']
    ))

    # Resources
    story.append(Paragraph("Useful Resources", styles['SectionHeading']))
    resources = [
        "GOV.UK - Office of the Public Guardian",
        "GOV.UK - Probate application forms",
        "STEP - Society of Trust and Estate Practitioners",
        "Law Society - Wills and inheritance guidance",
        "HMRC - Inheritance Tax guidance"
    ]
    for r in resources:
        story.append(Paragraph(f"• {r}", styles['BulletText']))

    # Footer
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cccccc')))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "This document is for general information only and does not constitute legal advice.",
        styles['Footer']
    ))
    story.append(Paragraph(
        "Prepared by Sarah Okafor, Barrister | Chambers of Sarah Okafor | January 2026",
        styles['Footer']
    ))

    doc.build(story)
    print(f"Created: {filename}")


def generate_immigration_newsletter():
    """Generate Immigration newsletter."""
    filename = os.path.join(OUTPUT_DIR, "Immigration-Legal-Update-January-2026.pdf")
    doc = SimpleDocTemplate(filename, pagesize=A4,
                           rightMargin=0.75*inch, leftMargin=0.75*inch,
                           topMargin=0.75*inch, bottomMargin=0.75*inch)

    styles = get_custom_styles()
    story = []

    # Header
    story.append(create_header_table(
        "Immigration & Human Rights",
        "Legal Update | January 2026",
        "#0d9488"
    ))
    story.append(Spacer(1, 20))

    # Introduction
    story.append(Paragraph("Introduction", styles['SectionHeading']))
    story.append(Paragraph(
        "This legal update provides an overview of immigration law and human rights in the UK, including "
        "the Immigration Rules, asylum claims, human rights applications, and No Recourse to Public Funds. "
        "It is intended for practitioners working in immigration and public law.",
        styles['NewsletterBody']
    ))

    # Immigration Rules
    story.append(Paragraph("Immigration Rules", styles['SectionHeading']))
    story.append(Paragraph(
        "The Immigration Rules set out the requirements for entry to and stay in the United Kingdom. "
        "Key routes include family visas, skilled worker visas, student visas, and settlement applications. "
        "The Rules are regularly updated and practitioners should check gov.uk for the current version.",
        styles['NewsletterBody']
    ))

    # Asylum
    story.append(Paragraph("Asylum Claims", styles['SectionHeading']))
    story.append(Paragraph(
        "A person may claim asylum in the UK if they have a well-founded fear of persecution for reasons "
        "of race, religion, nationality, membership of a particular social group, or political opinion "
        "(Refugee Convention 1951). Key principles:",
        styles['NewsletterBody']
    ))

    asylum_points = [
        "The burden of proof is on the applicant, but at a lower standard ('reasonable degree of likelihood')",
        "Past persecution may be evidence of future risk",
        "Internal relocation must be considered where relevant",
        "Country guidance cases provide authoritative findings on country conditions"
    ]
    for p in asylum_points:
        story.append(Paragraph(f"• {p}", styles['BulletText']))

    # Human Rights
    story.append(Paragraph("Human Rights Claims", styles['SectionHeading']))
    story.append(Paragraph(
        "Article 8 ECHR protects the right to respect for private and family life. In immigration cases, "
        "the court must assess whether removal would be a proportionate interference with Article 8 rights. "
        "The Immigration Rules set out the requirements for leave to remain on human rights grounds.",
        styles['NewsletterBody']
    ))

    # NRPF
    story.append(Paragraph("No Recourse to Public Funds", styles['SectionHeading']))
    story.append(Paragraph(
        "Many migrants are subject to NRPF conditions, meaning they cannot access most benefits and "
        "social housing. However, local authorities retain duties under the Children Act 1989 (s.17) and "
        "Care Act 2014 regardless of immigration status. Key resources include the NRPF Network guidance.",
        styles['NewsletterBody']
    ))

    # Resources
    story.append(Paragraph("Useful Resources", styles['SectionHeading']))
    resources = [
        "GOV.UK - Immigration Rules",
        "UNHCR - Refugee Convention guidance",
        "NRPF Network - Local authority guidance",
        "Free Movement - Immigration law updates",
        "ILPA - Immigration Law Practitioners' Association"
    ]
    for r in resources:
        story.append(Paragraph(f"• {r}", styles['BulletText']))

    # Footer
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cccccc')))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "This document is for general information only and does not constitute legal advice.",
        styles['Footer']
    ))
    story.append(Paragraph(
        "Prepared by Sarah Okafor, Barrister | Chambers of Sarah Okafor | January 2026",
        styles['Footer']
    ))

    doc.build(story)
    print(f"Created: {filename}")


def generate_public_law_newsletter():
    """Generate Public Law newsletter."""
    filename = os.path.join(OUTPUT_DIR, "Public-Law-Legal-Update-January-2026.pdf")
    doc = SimpleDocTemplate(filename, pagesize=A4,
                           rightMargin=0.75*inch, leftMargin=0.75*inch,
                           topMargin=0.75*inch, bottomMargin=0.75*inch)

    styles = get_custom_styles()
    story = []

    # Header
    story.append(create_header_table(
        "Public Law & Judicial Review",
        "Legal Update | January 2026",
        "#dc2626"
    ))
    story.append(Spacer(1, 20))

    # Introduction
    story.append(Paragraph("Introduction", styles['SectionHeading']))
    story.append(Paragraph(
        "This legal update provides an overview of public law and judicial review in England and Wales, "
        "including grounds for review, procedure, and remedies. It is intended for practitioners "
        "challenging or defending public body decisions.",
        styles['NewsletterBody']
    ))

    # Grounds for JR
    story.append(Paragraph("Grounds for Judicial Review", styles['SectionHeading']))
    story.append(Paragraph(
        "Judicial review is the process by which the courts supervise the exercise of public power. "
        "The traditional grounds were set out in CCSU v Minister for the Civil Service [1985] AC 374:",
        styles['NewsletterBody']
    ))

    story.append(Paragraph("Illegality", styles['SubHeading']))
    story.append(Paragraph(
        "The decision-maker must correctly understand the law and apply it. Errors include acting "
        "ultra vires (beyond powers), taking into account irrelevant considerations, failing to take "
        "into account relevant considerations, and fettering discretion.",
        styles['NewsletterBody']
    ))

    story.append(Paragraph("Irrationality (Wednesbury unreasonableness)", styles['SubHeading']))
    story.append(Paragraph(
        "A decision is irrational if it is 'so outrageous in its defiance of logic or accepted moral "
        "standards that no sensible person who had applied his mind to the question could have arrived "
        "at it.' The threshold is high but may be adjusted in human rights cases.",
        styles['NewsletterBody']
    ))

    story.append(Paragraph("Procedural Impropriety", styles['SubHeading']))
    story.append(Paragraph(
        "This includes failure to follow statutory procedures and breach of natural justice (the duty "
        "to act fairly). Natural justice requires that a person affected by a decision has a fair "
        "hearing and that the decision-maker is not biased.",
        styles['NewsletterBody']
    ))

    # Procedure
    story.append(Paragraph("JR Procedure (CPR Part 54)", styles['SectionHeading']))
    story.append(Paragraph(
        "Judicial review claims must be brought promptly and in any event within 3 months of the decision "
        "(shorter limits apply in some cases). The procedure involves:",
        styles['NewsletterBody']
    ))

    procedure = [
        "Pre-action protocol letter (usually required)",
        "Permission stage - court considers whether arguable case",
        "Substantive hearing if permission granted",
        "Remedies: quashing order, mandatory order, prohibiting order, declaration, damages"
    ]
    for p in procedure:
        story.append(Paragraph(f"• {p}", styles['BulletText']))

    # Human Rights Act
    story.append(Paragraph("Human Rights Act 1998", styles['SectionHeading']))
    story.append(Paragraph(
        "The HRA 1998 incorporated the European Convention on Human Rights into domestic law. Section 6 "
        "makes it unlawful for public authorities to act incompatibly with Convention rights. Courts "
        "must take Strasbourg jurisprudence into account when determining Convention questions.",
        styles['NewsletterBody']
    ))

    # Resources
    story.append(Paragraph("Useful Resources", styles['SectionHeading']))
    resources = [
        "BAILII - Administrative Court decisions",
        "Judiciary.uk - Judicial review guidance",
        "GOV.UK - Pre-action protocol for JR",
        "UK Human Rights Blog",
        "Public Law Project - JR resources"
    ]
    for r in resources:
        story.append(Paragraph(f"• {r}", styles['BulletText']))

    # Footer
    story.append(Spacer(1, 30))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor('#cccccc')))
    story.append(Spacer(1, 10))
    story.append(Paragraph(
        "This document is for general information only and does not constitute legal advice.",
        styles['Footer']
    ))
    story.append(Paragraph(
        "Prepared by Sarah Okafor, Barrister | Chambers of Sarah Okafor | January 2026",
        styles['Footer']
    ))

    doc.build(story)
    print(f"Created: {filename}")


if __name__ == "__main__":
    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("Generating legal update newsletters...")
    print("=" * 50)

    generate_cop_newsletter()
    generate_asc_newsletter()
    generate_family_newsletter()
    generate_private_client_newsletter()
    generate_immigration_newsletter()
    generate_public_law_newsletter()

    print("=" * 50)
    print("All newsletters generated successfully!")
    print(f"Output directory: {OUTPUT_DIR}")
