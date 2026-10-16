from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, white
import arabic_reshaper
from bidi.algorithm import get_display

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'pdf'; OUT.mkdir(parents=True,exist_ok=True)
W,H=A4; NAVY=HexColor('#112b4a'); LIME=HexColor('#d5e44a'); PALE=HexColor('#f3f6f4'); INK=HexColor('#25354a'); MUTED=HexColor('#687987')
pdfmetrics.registerFont(TTFont('Arabic',r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('Arabic-Bold',r'C:\Windows\Fonts\arialbd.ttf'))
pdfmetrics.registerFont(TTFont('Arial',r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold',r'C:\Windows\Fonts\arialbd.ttf'))

DATA={
 'ar':{
  'file':'powercore-import-guide.pdf','title':'دليل مبسط للاستيراد من الصين','subtitle':'خطوات عملية من فكرة المنتج إلى وصول الشحنة','description':'هذا الدليل يساعدك على ترتيب المعلومات والأسئلة قبل بدء طلب الاستيراد. تختلف الإجراءات والتكاليف والمتطلبات حسب نوع المنتج والمورد وطريقة الشحن والجهات المختصة.',
  'headers':['01  |  جهّز طلبك','02  |  راجع المورد والمنتج','03  |  خطط للشحن والوصول'],
  'intros':['ابدأ بوصف واضح لما تريد شراءه. كلما كانت المواصفات أدق، صار طلب العرض ومقارنة الخيارات أسهل.','قبل اعتماد كمية كبيرة، اتفق مع المورد على ما سيُنتج وكيف ستراجع العينة والجودة.','اطلب عرضاً يوضح نطاق النقل والخدمات المشمولة، وتحقق من المتطلبات الخاصة بمنتجك قبل الشحن.'],
  'cards':[
   [('عرّف المنتج','اكتب الاستخدام، المواد، الأبعاد، الألوان، الأداء أو المواصفات الضرورية.'),('حدّد الكمية','قدّر الكمية الأولية والكمية المستهدفة، ووضح إن كنت تحتاج عينة.'),('أرفق مرجعاً','أرسل صوراً أو رسماً أو رابطاً لمنتج مشابه، وحدد ما يجب تغييره.'),('حدد التغليف','اذكر طريقة التغليف والملصقات والعلامة التجارية إن كانت مطلوبة.')],
   [('قارن عروض الموردين','قارن المواصفات والحد الأدنى للطلب ومدة التجهيز وشروط الدفع والتغليف.'),('تحقق من التفاصيل','اطلب بيانات الشركة وعنوان المصنع ومعلومات المنتج، واطلب توضيحات عند وجود اختلاف.'),('اعتمد العينة','راجع العينة مقابل المواصفات المكتوبة، وسجل التعديلات والاعتماد كتابةً.'),('اتفق على الفحص','حدد نقاط الفحص وتوقيته وطريقة مشاركة النتائج قبل بدء الإنتاج أو الشحن.')],
   [('اطلب تفاصيل الشحنة','اجمع عدد الطرود وأبعادها ووزنها وطبيعة البضاعة ومكان الاستلام والتسليم.'),('قارن طريقة النقل','قارن الخيارات المتاحة بحسب حجم الشحنة والمدة المتوقعة ومناولة البضائع.'),('تحقق من المستندات','اطلب قائمة المستندات من المورد والناقل، وتحقق من متطلبات المنتج مع الجهة المختصة أو مخلص جمركي.'),('راجع التكلفة الكاملة','اسأل عما يشمله العرض وما قد يضاف من رسوم نقل أو مناولة أو تخليص أو رسوم نظامية.')]
  ],
  'bottom_title':'قائمة مختصرة قبل إرسال طلبك','bottom_text':'نوع المنتج ومواصفاته  |  الكمية  |  صور أو رسم  |  مدينة التسليم  |  الخدمات المطلوبة','note':'هذا دليل عام للتخطيط ولا يمثل استشارة تنظيمية أو جمركية. تحقق من أحدث المتطلبات الخاصة بمنتجك وشحنتك لدى الجهات المختصة قبل الشراء أو الشحن.','cta':'هل تحتاج مساعدة في تنسيق طلبك؟','contact':'تواصل مع PowerCore Solutions عبر واتساب أو الهاتف','foot':'PowerCore Solutions  |  الرياض، المملكة العربية السعودية',
  'brand':'POWERCORE / IMPORT GUIDE','label':'دليل إرشادي عام'
 },
 'en':{
  'file':'powercore-import-guide-en.pdf','title':'A Practical Guide to Importing from China','subtitle':'From product idea to shipment arrival','description':'Use this guide to organize information and questions before starting an import request. Procedures, costs, and requirements vary by product, supplier, shipping method, and relevant authorities.',
  'headers':['01  |  Prepare your request','02  |  Review the supplier and product','03  |  Plan shipping and arrival'],
  'intros':['Start with a clear description of what you want to buy. Clear specifications make it easier to request and compare offers.','Before confirming a larger quantity, agree with the supplier on what will be made and how you will review samples and quality.','Request a quote that explains the transport scope and included services. Check product-specific requirements before shipment.'],
  'cards':[
   [('Describe the product','State its use, materials, dimensions, colors, performance, and essential specifications.'),('Estimate quantity','Share an initial and target quantity, and say whether you need a sample.'),('Add a reference','Provide photos, a drawing, or a similar product link and describe any changes.'),('Specify packaging','Mention packaging, labels, and branding if they are required.')],
   [('Compare supplier offers','Compare specifications, minimum order quantity, preparation time, payment terms, and packaging.'),('Check the details','Request company and factory details and product information. Ask about any inconsistencies.'),('Approve a sample','Review the sample against written specifications and record revisions and approval.'),('Agree on inspection','Set inspection points, timing, and how results will be shared before production or shipment.')],
   [('Collect shipment details','Gather package count, dimensions, weight, cargo type, pickup point, and delivery destination.'),('Compare transport options','Compare available options by shipment size, estimated timing, and cargo handling.'),('Check documents','Request document lists from the supplier and carrier. Check product requirements with the relevant authority or a customs broker.'),('Review total costs','Ask what the quote includes and what may be added for transport, handling, clearance, or statutory charges.')]
  ],
  'bottom_title':'A short checklist before requesting a quote','bottom_text':'Product and specifications  |  Quantity  |  Photos or drawing  |  Delivery city  |  Services needed','note':'This is a general planning guide, not regulatory or customs advice. Check current requirements for your product and shipment with relevant authorities before purchase or shipping.','cta':'Need help coordinating your request?','contact':'Contact PowerCore Solutions by WhatsApp or phone','foot':'PowerCore Solutions  |  Riyadh, Saudi Arabia',
  'brand':'POWERCORE / IMPORT GUIDE','label':'GENERAL GUIDE'
 }
}

def wrap(text,width,font,size):
    result=[]; line=''
    for word in text.split():
        trial=(line+' '+word).strip()
        shown=get_display(arabic_reshaper.reshape(trial)) if font.startswith('Arabic') else trial
        if line and pdfmetrics.stringWidth(shown,font,size)>width:
            result.append(line); line=word
        else: line=trial
    if line: result.append(line)
    return result
def draw_text(c,x,y,s,size,color,bold=False,lang='en',align='left'):
    font=('Arabic-Bold' if bold else 'Arabic') if lang=='ar' else ('Arial-Bold' if bold else 'Arial')
    shown=get_display(arabic_reshaper.reshape(s)) if lang=='ar' else s
    c.setFont(font,size); c.setFillColor(color)
    if align=='right': c.drawRightString(x,y,shown)
    else: c.drawString(x,y,shown)
def paragraph(c,x,y,s,width,size=9,leading=14,color=MUTED,bold=False,lang='en',align='left'):
    font=('Arabic-Bold' if bold else 'Arabic') if lang=='ar' else ('Arial-Bold' if bold else 'Arial')
    for line in wrap(s,width,font,size):
        draw_text(c,x,y,line,size,color,bold,lang,align); y-=leading
    return y
def render(lang,d):
    rtl=lang=='ar'; anchor='right' if rtl else 'left'; x=W-44 if rtl else 44
    c=canvas.Canvas(str(OUT/d['file']),pagesize=A4,pageCompression=1)
    c.setTitle(d['title']); c.setAuthor('PowerCore Solutions')
    for page in range(3):
        c.setFillColor(PALE); c.rect(0,0,W,H,stroke=0,fill=1)
        c.setFillColor(NAVY); c.rect(0,H-91,W,91,stroke=0,fill=1)
        draw_text(c,42,H-37,d['brand'],8,HexColor('#c5d2de'),True,'en','left')
        draw_text(c,W-42,H-41,d['title'] if page==0 else d['headers'][page],15 if page==0 else 13,white,True,lang,'right')
        if page==0:
            draw_text(c,x,H-67,d['subtitle'],9,LIME,True,lang,anchor)
            paragraph(c,x,H-127,d['description'],W-88,9,15,MUTED,False,lang,anchor)
            cards=d['cards'][0]; section_y=H-210
        else:
            paragraph(c,x,H-126,d['intros'][page-1],W-88,9,15,MUTED,False,lang,anchor)
            cards=d['cards'][page]; section_y=H-212
        # Four clear cards with ample space for translated copy.
        for i,(title,desc) in enumerate(cards):
            col=i%2; row=i//2
            bx=44+col*264; by=section_y-row*187
            c.setFillColor(white); c.roundRect(bx,by-155,250,165,6,stroke=0,fill=1)
            c.setFillColor(LIME); c.circle(bx+14 if not rtl else bx+236,by-20,9,stroke=0,fill=1)
            draw_text(c,bx+11 if not rtl else bx+239,by-23,str(i+1),7,NAVY,True,'en','left' if not rtl else 'right')
            tx=bx+16 if not rtl else bx+234
            paragraph(c,tx,by-50,title,218,10,14,NAVY,True,lang,anchor if rtl else 'left')
            paragraph(c,tx,by-78,desc,218,8.8,14,MUTED,False,lang,anchor if rtl else 'left')
        if page==0:
            c.setFillColor(HexColor('#e9f0e2')); c.roundRect(44,88,W-88,67,5,stroke=0,fill=1)
            draw_text(c,x,130,d['bottom_title'],9,NAVY,True,lang,anchor)
            paragraph(c,x,109,d['bottom_text'],W-112,7.2,11,INK,False,lang,anchor)
        if page==2:
            paragraph(c,x,142,d['note'],W-88,7.3,11,MUTED,False,lang,anchor)
            c.setFillColor(NAVY); c.roundRect(44,55,W-88,52,5,stroke=0,fill=1)
            draw_text(c,x,91,d['cta'],9,white,True,lang,anchor)
            paragraph(c,x,75,d['contact'],W-112,7.2,9,HexColor('#dbe5ec'),False,lang,anchor)
            draw_text(c,58,60,'+966 53 368 9666',7.8,LIME,True,'en','left')
        c.setStrokeColor(HexColor('#d8e1df')); c.line(42,38,W-42,38)
        draw_text(c,42 if not rtl else W-42,22,d['foot'],7.3,MUTED,False,lang,anchor)
        draw_text(c,W-60 if not rtl else 60,22,f'{page+1:02d}',8,NAVY,True,'en','left' if not rtl else 'right')
        c.showPage()
    c.save()
for language,content in DATA.items(): render(language,content)
print(OUT/'powercore-import-guide.pdf')
print(OUT/'powercore-import-guide-en.pdf')
