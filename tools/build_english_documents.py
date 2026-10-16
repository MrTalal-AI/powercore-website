from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.utils import ImageReader

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'pdf'
OUT.mkdir(parents=True,exist_ok=True)
W,H=A4
NAVY=HexColor('#112b4a'); BLUE=HexColor('#173c61'); LIME=HexColor('#d5e44a')
INK=HexColor('#25354a'); MUTED=HexColor('#687987'); PALE=HexColor('#f3f6f4')
pdfmetrics.registerFont(TTFont('Arial',r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold',r'C:\Windows\Fonts\arialbd.ttf'))

def txt(c,x,y,s,n=9,color=INK,bold=False):
    c.setFont('Arial-Bold' if bold else 'Arial',n); c.setFillColor(color); c.drawString(x,y,s)
def right(c,x,y,s,n=9,color=INK,bold=False):
    c.setFont('Arial-Bold' if bold else 'Arial',n); c.setFillColor(color); c.drawRightString(x,y,s)
def para(c,x,y,s,width,n=9,leading=14,color=MUTED,bold=False):
    font='Arial-Bold' if bold else 'Arial'; line=''
    for word in s.split():
        trial=(line+' '+word).strip()
        if line and pdfmetrics.stringWidth(trial,font,n)>width:
            txt(c,x,y,line,n,color,bold); y-=leading; line=word
        else: line=trial
    if line: txt(c,x,y,line,n,color,bold); y-=leading
    return y
def page_header(c,num,title):
    c.setFillColor(PALE); c.rect(0,0,W,H,stroke=0,fill=1)
    c.setFillColor(NAVY); c.rect(0,H-83,W,83,stroke=0,fill=1)
    txt(c,42,H-39,'POWERCORE / COMPANY PROFILE',8,HexColor('#c5d2de'),True)
    right(c,W-42,H-39,title,15,white,True)
    c.setStrokeColor(HexColor('#d8e1df')); c.line(42,37,W-42,37)
    txt(c,42,22,'PowerCore Solutions  |  Riyadh, Saudi Arabia',7.5,MUTED)
    txt(c,W-60,22,f'{num:02d}',8,NAVY,True)
def cover_base(c,title,subtitle,desc):
    c.setFillColor(NAVY); c.rect(0,0,W,H,stroke=0,fill=1)
    c.setFillColor(BLUE); c.circle(W+25,H-83,245,stroke=0,fill=1)
    c.setFillColor(Color(.12,.60,.72,alpha=.17)); c.circle(10,132,180,stroke=0,fill=1)
    c.setFillColor(LIME); c.rect(W-91,H-133,47,3,stroke=0,fill=1)
    c.setFillColor(white); c.roundRect(42,H-184,326,80,7,stroke=0,fill=1)
    c.drawImage(ImageReader(str(ROOT/'assets'/'powercore-logo.png')),54,H-177,width=300,height=66,preserveAspectRatio=True,anchor='c',mask='auto')
    right(c,W-46,H-251,title,22,white,True); right(c,W-46,H-287,subtitle,12,LIME,True)
    para(c,46,H-326,desc,W-92,9.5,18,HexColor('#dbe5ec'))
    txt(c,47,75,'+966 53 368 9666',10,LIME,True); txt(c,47,57,'Riyadh, Saudi Arabia',8,HexColor('#dbe5ec'))

# English company profile
f=OUT/'powercore-company-profile-en.pdf'; c=canvas.Canvas(str(f),pagesize=A4,pageCompression=1)
c.setTitle('PowerCore Solutions | Company Profile (English)'); c.setAuthor('PowerCore Solutions')
c.setFillColor(NAVY); c.rect(0,0,W,H,stroke=0,fill=1); c.setFillColor(BLUE); c.circle(W+25,H-80,240,stroke=0,fill=1); c.setFillColor(Color(.12,.60,.72,alpha=.2)); c.circle(10,145,180,stroke=0,fill=1)
c.setFillColor(LIME); c.rect(W-88,H-130,46,3,stroke=0,fill=1); c.setFillColor(white); c.roundRect(42,H-181,316,77,7,stroke=0,fill=1)
c.drawImage(ImageReader(str(ROOT/'assets'/'powercore-logo.png')),54,H-174,width=292,height=62,preserveAspectRatio=True,anchor='c',mask='auto')
right(c,W-46,H-249,'Your China-Saudi Business Partner',19,white,True); right(c,W-46,H-287,'From sourcing to shipping coordination',12,LIME,True)
para(c,46,H-328,'PowerCore Solutions is a Saudi company based in Riyadh. We support individuals and businesses working with China, from sourcing and manufacturing to product inspection, warehousing, and shipping coordination.',W-92,10,19,HexColor('#dbe5ec'))
highlights=[('Sourcing and manufacturing','Coordinate product, supplier, and manufacturing options.'),('Inspection and preparation','Follow specifications and arrange inspection or storage options.'),('Shipping and clearance','Coordinate shipment arrangements and clearance requirements.'),('Business support','Project development, field research, and visit assistance.')]
for i,(title,desc) in enumerate(highlights):
    col=i%2; row=i//2; x=46+col*((W-100)/2+8); y=H-510-row*98; c.setFillColor(Color(1,1,1,alpha=.09)); c.roundRect(x,y,(W-100)/2,82,6,stroke=0,fill=1)
    txt(c,x+14,y+55,title,9.5,LIME,True); para(c,x+14,y+34,desc,(W-100)/2-28,8,13,HexColor('#dbe5ec'))
c.setFillColor(LIME); c.roundRect(46,87,W-92,44,5,stroke=0,fill=1); txt(c,62,112,'Contact us to discuss your project needs',10,NAVY,True); txt(c,62,96,'+966 53 368 9666',10,NAVY,True); c.showPage()
page_header(c,2,'Our Services'); right(c,W-44,H-120,'Flexible support based on each project\'s needs',10,MUTED)
services=[('Import and export','Coordinate purchasing and trade with suppliers in China.'),('Manufacturing','Explore manufacturing options and follow specifications.'),('Product inspection and quality control','Arrange inspection against an agreed scope.'),('Warehousing in China','Coordinate storage and consolidation before shipping.'),('Project development','Turn an idea into practical initial steps.'),('Marketing and field research','Gather information within an agreed project scope.'),('Logo design','Create a logo aligned with the brand direction.'),('China visit assistance','Coordinate support for business visits.'),('Certificates and licenses','Help follow up on product-related requirements.'),('Customs clearance','Coordinate clearance based on shipment details.')]
for i,(title,desc) in enumerate(services):
    col=i%2; row=i//2; x=44+col*264; y=H-151-row*112; c.setFillColor(white); c.roundRect(x,y-82,250,96,5,stroke=0,fill=1); c.setFillColor(LIME); c.circle(x+12,y-13,4,stroke=0,fill=1)
    txt(c,x+23,y-18,title,8.1,NAVY,True); para(c,x+14,y-41,desc,222,7.8,12,MUTED)
c.showPage()
page_header(c,3,'Who We Serve and How to Start'); right(c,W-44,H-120,'Who we support',13,NAVY,True)
audiences=[('Retail and e-commerce','Product and supplier search and order preparation.'),('Companies and traders','Import coordination and pre-shipment follow-up.'),('Manufacturers and product owners','Explore manufacturing and specifications.'),('Entrepreneurs and founders','Research options and early project steps.')]
for i,(title,desc) in enumerate(audiences):
    col=i%2; row=i//2; x=44+col*264; y=H-145-row*77; c.setFillColor(white); c.roundRect(x,y-54,250,66,5,stroke=0,fill=1); txt(c,x+12,y-13,title,8.2,NAVY,True); txt(c,x+12,y-34,desc,7.1,MUTED)
right(c,W-44,H-320,'Sourcing examples',13,NAVY,True); txt(c,44,H-344,'Product materials shared by the company include:',8,MUTED)
for i,(title,desc) in enumerate([('Paint protection film (PPF)','Example of automotive protection film rolls.'),('Automotive window films','Example of window film roll sourcing.')]):
    y=H-372-i*51; c.setFillColor(HexColor('#e8eee8')); c.roundRect(44,y-33,W-88,41,4,stroke=0,fill=1); txt(c,58,y-8,title,8.3,NAVY,True); txt(c,58,y-25,desc,7.2,MUTED)
    image=ROOT/'assets'/('ppf-box.png' if i==0 else 'window-tint-box.png'); c.drawImage(ImageReader(str(image)),W-108,y-29,width=54,height=32,preserveAspectRatio=True,anchor='c',mask='auto')
right(c,W-44,H-488,'How to get started',13,NAVY,True)
steps=['Tell us about your product or project idea.','Share quantity, specifications, or photos if available.','We review the scope, steps, and costs with you.','We coordinate updates through the agreed channel.']
for i,item in enumerate(steps):
    y=H-517-i*24; c.setFillColor(LIME); c.circle(53,y+2,8,stroke=0,fill=1); txt(c,50,y,str(i+1),6.5,NAVY,True); txt(c,72,y,item,8,INK)
c.setFillColor(NAVY); c.roundRect(44,61,W-88,71,6,stroke=0,fill=1); txt(c,60,108,'PowerCore Solutions | Riyadh, Saudi Arabia',8.7,white,True); txt(c,60,87,'+966 53 368 9666',9.5,LIME,True); txt(c,60,70,'Service scope, prices, and timelines are confirmed after reviewing each request.',6.7,HexColor('#c3d0da')); c.save()

# English product catalog
f=OUT/'powercore-product-catalog-en.pdf'; c=canvas.Canvas(str(f),pagesize=A4,pageCompression=1)
c.setTitle('PowerCore Solutions | Product Examples (English)'); c.setAuthor('PowerCore Solutions')
cover_base(c,'Product Examples','Paint protection and automotive window films','Examples of products shown in sourcing materials and images shared by the company. This catalog introduces product categories. Specifications, availability, and pricing are reviewed for each request.')
for x,img,label,bg in [(47,'ppf-box.png','PAINT PROTECTION FILM',HexColor('#e4e9e1')),(W/2+6,'window-tint-box.png','WINDOW FILM',HexColor('#e1e9ed'))]:
    c.setFillColor(bg); c.roundRect(x,H-570,(W-108)/2,178,7,stroke=0,fill=1); c.drawImage(ImageReader(str(ROOT/'assets'/img)),x+11,H-545,width=(W-130)/2,height=130,preserveAspectRatio=True,anchor='c',mask='auto'); txt(c,x+13,H-558,label,6.5,HexColor('#516879'),True)
c.showPage(); c.setFillColor(PALE); c.rect(0,0,W,H,stroke=0,fill=1); c.setFillColor(NAVY); c.rect(0,H-83,W,83,stroke=0,fill=1)
txt(c,42,H-40,'POWERCORE / PRODUCT GUIDE',8,HexColor('#c5d2de'),True); right(c,W-42,H-40,'Categories and Specification Examples',13,white,True)
txt(c,42,H-115,'01  |  PAINT PROTECTION FILM',12.5,NAVY,True); para(c,42,H-140,'Transparent films for vehicle paint protection. Product layers, thicknesses, and roll lengths vary by item and supplier.',W-84,8.7,14,MUTED)
c.setFillColor(white); c.roundRect(42,H-253,W-84,74,5,stroke=0,fill=1); txt(c,58,H-204,'Specification example appearing in sourcing documents',8.7,NAVY,True); txt(c,58,H-231,'PPF  |  7.5 mil  |  Roll width 152 cm  |  Example length: 15 m',7.8,INK,True)
txt(c,42,H-293,'02  |  AUTOMOTIVE WINDOW FILMS',12.5,NAVY,True); para(c,42,H-318,'Films in different shades and properties. The required shade and size are confirmed when preparing a quote.',W-84,8.7,14,MUTED)
c.setFillColor(white); c.roundRect(42,H-443,W-84,94,5,stroke=0,fill=1); txt(c,58,H-376,'Product names appearing in sourcing records',8.7,NAVY,True); txt(c,58,H-401,'Matte  |  Glossy black  |  Windshield  |  Numbered shades',8,INK); txt(c,58,H-426,'Example roll sizes in records: 152 cm x 15 m  /  152 cm x 30 m',7.6,INK)
txt(c,42,H-484,'Before confirming an order',12,NAVY,True)
for i,(title,desc) in enumerate([('Select the item','Choose PPF or window film and the requested shade or finish.'),('Share specifications','Provide size, thickness, roll length, and intended use.'),('Confirm details','Availability, specifications, and packaging are checked before confirming a quote.')]):
    y=H-523-i*58; c.setFillColor(white); c.roundRect(42,y-43,W-84,49,4,stroke=0,fill=1); c.setFillColor(LIME); c.circle(58,y-18,8,stroke=0,fill=1); txt(c,55,y-21,str(i+1),6.5,NAVY,True); txt(c,77,y-14,title,8.3,NAVY,True); txt(c,77,y-31,desc,7.3,MUTED)
c.setFillColor(NAVY); c.roundRect(42,67,W-84,75,5,stroke=0,fill=1); txt(c,58,116,'Ask about availability or request a tailored quote',9,white,True); txt(c,58,96,'Contact PowerCore Solutions in Riyadh',7.8,HexColor('#dbe5ec')); txt(c,58,79,'+966 53 368 9666',9,LIME,True)
para(c,42,54,'Note: Items and sizes are examples from records shared by the company. They do not confirm current stock or certify a specification. Availability and pricing vary by request.',W-84,6.1,8.5,MUTED)
c.setStrokeColor(HexColor('#d8e1df')); c.line(42,38,W-42,38); txt(c,42,23,'PowerCore Solutions  |  Riyadh, Saudi Arabia',7.5,MUTED); txt(c,W-60,23,'02',8,NAVY,True); c.save()
print(OUT/'powercore-company-profile-en.pdf')
print(OUT/'powercore-product-catalog-en.pdf')
