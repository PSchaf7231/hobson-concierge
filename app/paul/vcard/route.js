const VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Schafranick;Paul;;;',
  'FN:Paul Schafranick',
  'ORG:Palm Beach Real Estate Pros',
  'TITLE:Real Estate Advisor',
  'TEL;TYPE=CELL,VOICE:+15612557285',
  'EMAIL;TYPE=INTERNET:Paul@askhobson.homes',
  'URL:https://paul.askhobson.homes',
  'NOTE:Residential real estate in Palm Beach County\\, commercial and medical NNN (Next Endeavor CRE)\\, and Set & Forget Media websites.',
  'END:VCARD'
].join('\r\n')

export function GET() {
  return new Response(VCARD, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="Paul-Schafranick.vcf"'
    }
  })
}
