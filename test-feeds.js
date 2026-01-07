const feeds = [
  // Legislation
  { name: 'Legislation New', url: 'https://www.legislation.gov.uk/new/data.feed' },
  { name: 'Legislation UKPGA', url: 'https://www.legislation.gov.uk/ukpga/data.feed' },
  { name: 'Legislation UKSI', url: 'https://www.legislation.gov.uk/uksi/data.feed' },

  // Parliament
  { name: 'Bills', url: 'https://bills.parliament.uk/rss/allbills.rss' },
  { name: 'Commons Library', url: 'https://commonslibrary.parliament.uk/feed/' },
  { name: 'Lords Library', url: 'https://lordslibrary.parliament.uk/feed/' },

  // Gov UK
  { name: 'MoJ', url: 'https://www.gov.uk/government/organisations/ministry-of-justice.atom' },
  { name: 'HMCTS', url: 'https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service.atom' },
  { name: 'LAA', url: 'https://www.gov.uk/government/organisations/legal-aid-agency.atom' },

  // Professional
  { name: 'Law Gazette', url: 'https://www.lawgazette.co.uk/feed' },
  { name: 'Legal Futures', url: 'https://www.legalfutures.co.uk/feed' },
  { name: 'The Lawyer', url: 'https://www.thelawyer.com/feed/' },

  // Access to Justice
  { name: 'Shelter', url: 'https://england.shelter.org.uk/feed.rss' },
  { name: 'Citizens Advice', url: 'https://www.citizensadvice.org.uk/about-us/about-us1/media/press-releases/feed/' },
  { name: 'Liberty', url: 'https://www.libertyhumanrights.org.uk/feed/' },

  // Immigration
  { name: 'Free Movement', url: 'https://freemovement.org.uk/feed/' },
  { name: 'Right to Remain', url: 'https://righttoremain.org.uk/feed/' },
  { name: 'Refugee Council', url: 'https://www.refugeecouncil.org.uk/feed/' },

  // Blogs
  { name: 'Nearly Legal', url: 'https://nearlylegal.co.uk/feed/' },
  { name: 'UK Const Law', url: 'https://ukconstitutionallaw.org/feed/' },
  { name: 'Pink Tape', url: 'https://pinktape.co.uk/feed/' },
  { name: 'Transparency Project', url: 'https://www.transparencyproject.org.uk/feed/' },
  { name: 'UK Human Rights Blog', url: 'https://ukhumanrightsblog.com/feed/' },
  { name: 'Local Gov Lawyer', url: 'https://www.localgovernmentlawyer.co.uk/feed' },

  // Academic
  { name: 'Oxford Law Blog', url: 'https://www.law.ox.ac.uk/news/feed' },
  { name: 'Oxford Human Rights', url: 'https://ohrh.law.ox.ac.uk/feed/' },

  // Scotland
  { name: 'Scottish Legal News', url: 'https://www.scottishlegal.com/feed' },
  { name: 'Law Scot Journal', url: 'https://www.lawscot.org.uk/members/journal/feed/' },

  // Publishers
  { name: 'ICLR', url: 'https://www.iclr.co.uk/feed/' },
  { name: 'Sentencing Council', url: 'https://www.sentencingcouncil.org.uk/feed/' },
];

const API = 'https://api.rss2json.com/v1/api.json?rss_url=';

async function testFeed(feed) {
  try {
    const res = await fetch(API + encodeURIComponent(feed.url));
    const data = await res.json();
    if (data.status === 'ok' && data.items && data.items.length > 0) {
      console.log('OK ' + feed.name + ': ' + data.items.length + ' items');
      return true;
    } else {
      console.log('FAIL ' + feed.name + ': ' + (data.message || 'no items'));
      return false;
    }
  } catch (e) {
    console.log('ERROR ' + feed.name + ': ' + e.message);
    return false;
  }
}

async function main() {
  for (const feed of feeds) {
    await testFeed(feed);
  }
}

main();
