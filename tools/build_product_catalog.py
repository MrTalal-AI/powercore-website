from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.utils import ImageReader
import arabic_reshaper
from bidi.algorithm import get_display

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'pdf'/'powercore-product-catalog.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
W,H=A4
NAVY=HexColor('#112b4a'); BLUE=HexColor('#173c61'); LIME=HexColor('#d5e44a')
INK=HexColor('#25354a'); MUTED=HexColor('#687987'); PALE=HexColor('#f3f6f4')
pdfmetrics.registerFont(TTFont('Arabic',r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('Arabic-Bold',r'C:\Windows\Fonts\arialbd.ttf'))

def shape(value): return get_display(arabic_reshaper.reshape(value))
def rtl(c,x,y,value,size=10,color=INK,bold=False):
    c.setFont('Arabic-Bold' if bold else 'Arabic',size); c.setFillColor(color); c.drawRightString(x,y,shape(value))
def ltr(c,x,y,value,size=9,color=INK,bold=False):
    c.setFont('Arabic-Bold' if bold else 'Arabic',size); c.setFillColor(color); c.drawString(x,y,value)
def lines(value,width,size,bold=False):
    font='Arabic-Bold' if bold else 'Arabic'; result=[]; line=''
    for word in value.split():
        candidate=(line+' '+word).strip()
        if not line or pdfmetrics.stringWidth(shape(candidate),font,size)<=width: line=candidate
        else: result.append(line); line=word
    if line: result.append(line)
    return result
def para(c,x,y,value,width,size=9,leading=14,color=MUTED,bold=False):
    for line in lines(value,width,size,bold): rtl(c,x,y,line,size,color,bold); y-=leading
    return y
def pill(c,x,y,label):
    label_width=pdfmetrics.stringWidth(shape(label),'Arabic',8)
    c.setFillColor(HexColor('#edf3e1')); c.roundRect(x-label_width-16,y-5,label_width+16,20,4,stroke=0,fill=1)
    rtl(c,x-8,y+1,label,8,HexColor('#71883e'))
def footer(c,page):
    c.setStrokeColor(HexColor('#d8e1df')); c.line(42,38,W-42,38)
    ltr(c,42,23,'PowerCore Solutions  |  Riyadh, Saudi Arabia',7.5,MUTED)
    ltr(c,W-62,23,f'{page:02d}',8,NAVY,True)

c=canvas.Canvas(str(OUT),pagesize=A4,pageCompression=1)
c.setTitle('PowerCore Solutions | Product Examples')
c.setAuthor('PowerCore Solutions')
# Cover page
c.setFillColor(NAVY); c.rect(0,0,W,H,stroke=0,fill=1)
c.setFillColor(BLUE); c.circle(W+25,H-83,245,stroke=0,fill=1)
c.setFillColor(Color(.12,.60,.72,alpha=.17)); c.circle(10,132,180,stroke=0,fill=1)
c.setFillColor(LIME); c.rect(W-91,H-133,47,3,stroke=0,fill=1)
c.setFillColor(white); c.roundRect(42,H-184,326,80,7,stroke=0,fill=1)
c.drawImage(ImageReader(str(ROOT/'assets'/'powercore-logo.png')),54,H-177,width=300,height=66,preserveAspectRatio=True,anchor='c',mask='auto')
rtl(c,W-46,H-251,'كتالوج أمثلة المنتجات',24,white,True)
rtl(c,W-46,H-287,'أفلام حماية الطلاء ونوافذ السيارات',13,LIME,True)
para(c,W-46,H-326,'نماذج من المنتجات الواردة في مواد وصور التوريد التي شاركتها الشركة. هذا الكتالوج للتعريف بفئات المنتجات، وتُراجع المواصفات والتوفر والسعر لكل طلب على حدة.',W-92,10,18,HexColor('#dbe5ec'))
# Product image panels
panel_y=H-570
for x,img,label,bg in [(47,'ppf-box.png','PAINT PROTECTION FILM',HexColor('#e4e9e1')),(W/2+6,'window-tint-box.png','WINDOW FILM',HexColor('#e1e9ed'))]:
    c.setFillColor(bg); c.roundRect(x,panel_y, (W-108)/2,178,7,stroke=0,fill=1)
    c.drawImage(ImageReader(str(ROOT/'assets'/img)),x+11,panel_y+25,width=(W-130)/2,height=130,preserveAspectRatio=True,anchor='c',mask='auto')
    ltr(c,x+13,panel_y+11,label,7,HexColor('#516879'),True)
rtl(c,W-46,H-609,'مجالات المنتجات',11,white,True)
pill(c,W-55,H-644,'أفلام حماية الطلاء PPF')
pill(c,W-55,H-676,'أفلام نوافذ السيارات')
rtl(c,W-46,88,'الرياض، المملكة العربية السعودية',8,HexColor('#dbe5ec'))
ltr(c,47,69,'+966 53 368 9666',10,LIME,True)
c.showPage()

# Product details page
c.setFillColor(PALE); c.rect(0,0,W,H,stroke=0,fill=1)
c.setFillColor(NAVY); c.rect(0,H-83,W,83,stroke=0,fill=1)
rtl(c,W-42,H-40,'أمثلة على الفئات والمواصفات',15,white,True)
ltr(c,42,H-40,'POWERCORE / PRODUCT GUIDE',8,HexColor('#c5d2de'),True)
rtl(c,W-42,H-115,'01  |  أفلام حماية الطلاء',14,NAVY,True)
para(c,W-42,H-140,'أفلام شفافة لحماية طلاء المركبات، وتختلف طبقات المنتج والسماكة والأطوال بحسب الصنف والمورد.',W-84,9,15,MUTED)
c.setFillColor(white); c.roundRect(42,H-253,W-84,74,5,stroke=0,fill=1)
rtl(c,W-58,H-204,'مثال مواصفة وردت في مستندات التوريد',9,NAVY,True)
rtl(c,W-58,H-231,'PPF  |  سماكة 7.5 mil  |  عرض الرول 152 سم  |  طول المثال 15 م',8,INK,True)
rtl(c,W-42,H-293,'02  |  أفلام نوافذ السيارات',14,NAVY,True)
para(c,W-42,H-318,'أفلام بدرجات وخصائص مختلفة للاستخدام على نوافذ السيارات، وتُحدد الدرجة المناسبة والمقاس عند طلب العرض.',W-84,9,15,MUTED)
c.setFillColor(white); c.roundRect(42,H-443,W-84,94,5,stroke=0,fill=1)
rtl(c,W-58,H-376,'مسميات ظهرت ضمن ملفات التوريد',9,NAVY,True)
rtl(c,W-58,H-401,'مطفي  |  أسود لامع  |  زجاج أمامي  |  درجات مرقمة',8.5,INK)
rtl(c,W-58,H-426,'أمثلة لمقاسات الرولات في السجلات: 152 سم × 15 م / 152 سم × 30 م',8,INK)
rtl(c,W-42,H-484,'قبل اعتماد طلبك',13,NAVY,True)
items=[
 ('حدد الصنف','PPF أو أفلام نوافذ، والدرجة أو اللون المطلوب.'),
 ('أرسل المواصفات','المقاس والسماكة وطول الرول والاستخدام المقصود.'),
 ('أكد التفاصيل','نتحقق من التوفر والمواصفات والتغليف قبل تأكيد العرض.'),
]
for i,(title,desc) in enumerate(items):
    y=H-523-i*58
    c.setFillColor(white); c.roundRect(42,y-43,W-84,49,4,stroke=0,fill=1)
    c.setFillColor(LIME); c.circle(W-58,y-18,8,stroke=0,fill=1)
    rtl(c,W-55,y-21,str(i+1),6.5,NAVY,True)
    rtl(c,W-77,y-14,title,8.5,NAVY,True)
    rtl(c,W-77,y-31,desc,7.7,MUTED)
c.setFillColor(NAVY); c.roundRect(42,67,W-84,75,5,stroke=0,fill=1)
rtl(c,W-58,116,'استفسر عن التوفر أو اطلب عرضاً مخصصاً',10,white,True)
rtl(c,W-58,96,'تواصل مع PowerCore Solutions في الرياض',8,HexColor('#dbe5ec'))
ltr(c,58,79,'+966 53 368 9666',9,LIME,True)
para(c,W-43,54,'ملاحظة: الأصناف والمقاسات المذكورة أمثلة من السجلات التي شاركتها الشركة، وليست تأكيداً للمخزون الحالي أو اعتماداً لمواصفة. يختلف التوفر والسعر بحسب طلب العميل.',W-86,6.6,9,MUTED)
footer(c,2)
c.save()
print(OUT)
