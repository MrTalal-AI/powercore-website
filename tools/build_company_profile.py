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
OUT=ROOT/'output'/'pdf'/'powercore-company-profile.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
W,H=A4
NAVY=HexColor('#112b4a'); BLUE=HexColor('#173c61'); LIME=HexColor('#d5e44a')
INK=HexColor('#25354a'); MUTED=HexColor('#687987'); PALE=HexColor('#f3f6f4')
pdfmetrics.registerFont(TTFont('Arabic',r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('Arabic-Bold',r'C:\Windows\Fonts\arialbd.ttf'))

def shape(s): return get_display(arabic_reshaper.reshape(s))
def rtl(c,x,y,s,size=10,color=INK,bold=False):
    c.setFont('Arabic-Bold' if bold else 'Arabic',size); c.setFillColor(color); c.drawRightString(x,y,shape(s))
def ltr(c,x,y,s,size=9,color=INK,bold=False):
    c.setFont('Arabic-Bold' if bold else 'Arabic',size); c.setFillColor(color); c.drawString(x,y,s)
def lines_for(s,width,size,bold=False):
    font='Arabic-Bold' if bold else 'Arabic'; result=[]; line=''
    for word in s.split():
        test=(line+' '+word).strip()
        if not line or pdfmetrics.stringWidth(shape(test),font,size)<=width: line=test
        else: result.append(line); line=word
    if line: result.append(line)
    return result
def para(c,x,y,s,width,size=9,leading=14,color=MUTED,bold=False):
    for line in lines_for(s,width,size,bold): rtl(c,x,y,line,size,color,bold); y-=leading
    return y
def header(c,num,title):
    c.setFillColor(PALE); c.rect(0,0,W,H,stroke=0,fill=1)
    c.setFillColor(NAVY); c.rect(0,H-86,W,86,stroke=0,fill=1)
    rtl(c,W-42,H-39,title,16,white,True); ltr(c,42,H-39,'POWERCORE / COMPANY PROFILE',8,HexColor('#c5d2de'),True)
    c.setStrokeColor(HexColor('#d8e1df')); c.line(42,37,W-42,37)
    ltr(c,42,22,'PowerCore Solutions  |  Riyadh, Saudi Arabia',8,MUTED); ltr(c,W-60,22,f'{num:02d}',9,NAVY,True)

c=canvas.Canvas(str(OUT),pagesize=A4,pageCompression=1)
c.setTitle('PowerCore Solutions - Company Profile'); c.setAuthor('PowerCore Solutions')
# Cover
c.setFillColor(NAVY); c.rect(0,0,W,H,stroke=0,fill=1)
c.setFillColor(BLUE); c.circle(W+25,H-80,240,stroke=0,fill=1)
c.setFillColor(Color(.12,.60,.72,alpha=.2)); c.circle(10,145,180,stroke=0,fill=1)
c.setFillColor(LIME); c.rect(W-88,H-130,46,3,stroke=0,fill=1)
c.setFillColor(white); c.roundRect(42,H-181,316,77,7,stroke=0,fill=1)
c.drawImage(ImageReader(str(ROOT/'assets'/'powercore-logo.png')),54,H-174,width=292,height=62,preserveAspectRatio=True,anchor='c',mask='auto')
rtl(c,W-46,H-249,'شريكك التجاري بين الصين والسعودية',23,white,True)
rtl(c,W-46,H-287,'من الفكرة إلى التوريد والتجهيز والشحن',14,LIME,True)
para(c,W-46,H-328,'PowerCore Solutions شركة سعودية مقرها الرياض، تقدم خدمات مساندة للأفراد والمنشآت في أعمالهم مع الصين، من البحث والتوريد والتصنيع إلى فحص المنتجات والتخزين وتنسيق الشحن.',W-92,11,21,HexColor('#dbe5ec'))
highlights=[('التوريد والتصنيع','بحث وتنسيق خيارات المنتجات والموردين والتصنيع.'),('الفحص والتجهيز','متابعة المواصفات وخيارات الفحص والتخزين.'),('الشحن والتخليص','تنسيق مسار الشحنة ومتطلبات التخليص.'),('دعم الأعمال','تطوير المشاريع والبحث الميداني وخدمات الزيارة.')]
for i,(title,desc) in enumerate(highlights):
    col=i%2; row=i//2; x=46+col*((W-100)/2+8); y=H-510-row*98
    c.setFillColor(Color(1,1,1,alpha=.09)); c.roundRect(x,y,(W-100)/2,82,6,stroke=0,fill=1)
    rtl(c,x+(W-100)/2-14,y+55,title,11,LIME,True); para(c,x+(W-100)/2-14,y+34,desc,(W-100)/2-28,8.5,13,HexColor('#dbe5ec'))
c.setFillColor(LIME); c.roundRect(46,87,W-92,44,5,stroke=0,fill=1)
rtl(c,W-62,113,'تواصل معنا لمناقشة احتياج مشروعك',11,NAVY,True); ltr(c,62,101,'+966 53 368 9666',10,NAVY,True)
c.showPage()
# Services
header(c,2,'خدماتنا')
rtl(c,W-44,H-121,'حلول مرنة بحسب احتياج كل مشروع',10,MUTED)
services=[('الاستيراد والتصدير','تنسيق عمليات الشراء والتجارة مع الموردين في الصين.'),('التصنيع','مساندة في استكشاف خيارات التصنيع ومتابعة المواصفات.'),('فحص المنتجات ومراقبة الجودة','ترتيب فحص وفق نطاق ومواصفات يتفق عليها مسبقاً.'),('التخزين في الصين','تنسيق خيارات تخزين وتجميع المنتجات قبل الشحن.'),('تطوير المشاريع','تحويل الفكرة إلى احتياجات وخطوات أولية قابلة للنقاش.'),('التسويق والمسح الميداني','جمع معلومات ميدانية وفق نطاق المشروع والسوق.'),('تصميم الشعارات','تصميم شعار ينسجم مع فكرة العلامة وتوجهها.'),('تسهيلات زيارة الصين','تنسيق خدمات مساندة لزيارة العمل بحسب الاحتياج.'),('الشهادات والتراخيص','مساندة في متابعة المتطلبات ذات الصلة بالمنتج.'),('التخليص الجمركي','تنسيق إجراءات التخليص بحسب تفاصيل الشحنة.')]
for i,(title,desc) in enumerate(services):
    col=i%2; row=i//2; x=44+col*264; y=H-151-row*112
    c.setFillColor(white); c.roundRect(x,y-82,250,96,5,stroke=0,fill=1)
    c.setFillColor(LIME); c.circle(x+228,y-13,4,stroke=0,fill=1)
    rtl(c,x+214,y-18,title,9.5,NAVY,True); para(c,x+214,y-41,desc,214,8.2,13,MUTED)
c.showPage()
# Audiences and service examples
header(c,3,'مجالات العمل وطريقة البدء')
rtl(c,W-44,H-122,'من نخدم؟',13,NAVY,True)
audiences=[('المتاجر والتجارة الإلكترونية','البحث عن منتجات وموردين وتجهيز الطلبات.'),('الشركات والتجار','تنسيق الاستيراد ومتابعة البضائع قبل الشحن.'),('المصانع وأصحاب المنتجات','استكشاف التصنيع ومتابعة المواصفات.'),('رواد الأعمال وأصحاب الأفكار','بحث الخيارات والخطوات الأولية للمشروع.')]
for i,(title,desc) in enumerate(audiences):
    col=i%2; row=i//2; x=44+col*264; y=H-145-row*77
    c.setFillColor(white); c.roundRect(x,y-54,250,66,5,stroke=0,fill=1)
    rtl(c,x+232,y-13,title,9,NAVY,True); rtl(c,x+232,y-34,desc,7.7,MUTED)
rtl(c,W-44,H-320,'أمثلة من مجالات التوريد',13,NAVY,True)
rtl(c,W-44,H-344,'مواد شاركتها الشركة عن منتجات العناية بالسيارات:',8.7,MUTED)
for i,(title,desc) in enumerate([('أفلام حماية الطلاء PPF','مثال على رولات أفلام حماية للسيارات.'),('أفلام تظليل وعزل النوافذ','مثال على توريد رولات أفلام نوافذ السيارات.')]):
    y=H-372-i*51; c.setFillColor(HexColor('#e8eee8')); c.roundRect(44,y-33,W-88,41,4,stroke=0,fill=1)
    rtl(c,W-58,y-8,title,9,NAVY,True); rtl(c,W-58,y-25,desc,8,MUTED)
    sample=ROOT/'assets'/('ppf-box.png' if i==0 else 'window-tint-box.png')
    c.drawImage(ImageReader(str(sample)),55,y-29,width=54,height=32,preserveAspectRatio=True,anchor='c',mask='auto')
rtl(c,W-44,H-488,'كيف نبدأ؟',13,NAVY,True)
steps=['شاركنا نوع المنتج أو فكرة المشروع.','أرسل الكمية والمواصفات أو الصور إن توفرت.','نراجع نطاق الخدمة والخطوات والتكلفة معك.','ننسق التنفيذ والتحديثات عبر قناة التواصل المتفق عليها.']
for i,s in enumerate(steps):
    y=H-517-i*24; c.setFillColor(LIME); c.circle(W-53,y+2,8,stroke=0,fill=1); rtl(c,W-50,y,str(i+1),6.5,NAVY,True); rtl(c,W-72,y,s,8.5,INK)
c.setFillColor(NAVY); c.roundRect(44,61,W-88,71,6,stroke=0,fill=1)
rtl(c,W-60,108,'PowerCore Solutions | الرياض، المملكة العربية السعودية',9.5,white,True)
ltr(c,60,87,'+966 53 368 9666',10,LIME,True); rtl(c,W-60,86,'للطلبات والاستفسارات',8,HexColor('#dbe5ec'))
rtl(c,W-60,70,'الأسعار والمدد ونطاق الخدمات تحدد لكل طلب بعد مراجعة تفاصيله.',7.2,HexColor('#c3d0da'))
c.save()
print(OUT)
