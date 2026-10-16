from pathlib import Path
from html import escape

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'services'
OUT.mkdir(exist_ok=True)

SERVICES = [
    ('import-export','الاستيراد والتصدير','Import and export','تنسيق شراء المنتجات والتعامل التجاري مع الموردين في الصين، وصولاً إلى تجهيز الشحنة للسوق السعودي.','Coordinate product sourcing and trade with suppliers in China, through preparing shipments for the Saudi market.',['فهم احتياج المنتج والسوق المستهدف','التنسيق مع المورد ومتابعة تفاصيل الطلب','بحث خيارات الشحن والتخليص المناسبة'],['Understand product needs and target market','Coordinate with the supplier and follow order details','Review suitable shipping and clearance options']),
    ('manufacturing','التصنيع','Manufacturing','مساندة مشروعك في استكشاف خيارات التصنيع ومتابعة المواصفات مع الجهات ذات العلاقة في الصين.','Support your project in exploring manufacturing options and following specifications with relevant parties in China.',['توضيح متطلبات المنتج والاستخدام','مناقشة الخامات والمقاسات والتغليف','متابعة المواصفات المتفق عليها'],['Clarify product requirements and intended use','Discuss materials, dimensions, and packaging','Follow the agreed specifications']),
    ('quality-inspection','فحص المنتجات ومراقبة الجودة','Product inspection and quality control','ترتيب فحص للمنتج بحسب نقاط ومواصفات يتم الاتفاق عليها قبل التنفيذ، ومراجعة النتائج معك.','Arrange a product inspection against agreed checkpoints and specifications, then review the findings with you.',['تحديد نطاق الفحص قبل طلبه','مراجعة مطابقة المنتج للمواصفات المحددة','مشاركة الملاحظات المتاحة قبل الشحن'],['Define inspection scope before arranging it','Review the product against specified requirements','Share available findings before shipping']),
    ('warehousing-china','التخزين في الصين','Warehousing in China','تنسيق خيارات التخزين وتجميع البضائع في الصين قبل استكمال تجهيز الشحنة، وفق تفاصيل الطلب.','Coordinate storage and cargo consolidation options in China before shipment preparation, based on the request.',['مراجعة احتياج التخزين والمدة','تنظيم استقبال وتجميع المنتجات عند توفر الخدمة','تجهيز الشحنة للخطوة التالية'],['Review storage needs and duration','Coordinate receiving and consolidating products when available','Prepare cargo for the next step']),
    ('project-development','تطوير المشاريع','Project development','مساندة أصحاب الأفكار في تحويل احتياجهم إلى مسار عمل أولي وخيارات تنفيذ يمكن مناقشتها.','Help turn an early business idea into an initial plan and practical options for discussion.',['فهم الفكرة والهدف التجاري','تحديد الأسئلة والاحتياجات الرئيسية','اقتراح خدمات وخطوات أولية للمناقشة'],['Understand the idea and business goal','Identify key questions and requirements','Suggest initial services and steps for discussion']),
    ('market-research','التسويق والمسح الميداني','Marketing and field research','جمع معلومات ميدانية ومساندة تسويقية تساعد على استكشاف السوق والمنتجات في الصين بحسب نطاق المشروع.','Gather field information and marketing support to explore markets and products in China, according to the project scope.',['تحديد السوق أو المنتج المطلوب استكشافه','توضيح نطاق المعلومات المطلوبة','مشاركة نتائج البحث المتاحة ومناقشتها'],['Define the market or product to explore','Clarify the information scope','Share and discuss available findings']),
    ('logo-design','تصميم الشعارات','Logo design','تصميم شعار يعكس فكرة النشاط وهويته، بعد فهم توجه المشروع ومتطلبات استخدام الشعار.','Design a logo that reflects the business idea and identity after understanding the project direction and intended use.',['مناقشة فكرة العلامة والجمهور','تحديد التوجه البصري المطلوب','تنسيق المخرجات وفق نطاق العمل المتفق عليه'],['Discuss the brand idea and audience','Define the desired visual direction','Coordinate deliverables within the agreed scope']),
    ('china-visit','تسهيلات زيارة الصين','China visit assistance','تنسيق خدمات مساندة لزيارة العمل إلى الصين بحسب الغرض من الزيارة والاحتياجات المتفق عليها.','Coordinate support services for a business visit to China based on its purpose and agreed needs.',['تحديد هدف الزيارة والمدينة','مناقشة الترتيبات المطلوبة مسبقاً','تنسيق الخدمات المتاحة حسب البرنامج'],['Identify visit purpose and city','Discuss arrangements in advance','Coordinate available services for the itinerary']),
    ('certificates-licenses','الشهادات والتراخيص','Certificates and licenses','مساندة في متابعة متطلبات الشهادات والتراخيص ذات الصلة بالمنتج، مع التحقق من المتطلبات حسب الجهة المختصة.','Assist with following relevant product certificates and licenses, subject to checking requirements with the applicable authority.',['تحديد فئة المنتج ومتطلبات السوق','مراجعة الوثائق والمتطلبات ذات الصلة','تنسيق الخطوات مع الجهات المعنية عند الحاجة'],['Identify product category and market requirements','Review relevant documents and requirements','Coordinate steps with relevant parties when needed']),
    ('customs-clearance','التخليص الجمركي','Customs clearance','تنسيق إجراءات التخليص المرتبطة بالشحنة بحسب نوع المنتج والمستندات والاشتراطات المعمول بها.','Coordinate shipment clearance steps according to product type, documentation, and applicable requirements.',['مراجعة بيانات الشحنة والمستندات المتاحة','تحديد المتطلبات التي تحتاج إلى استكمال','تنسيق الخطوات المرتبطة بالتخليص'],['Review shipment details and available documents','Identify requirements that need completion','Coordinate related clearance steps']),
]

def esc(text): return escape(text, quote=True)

def make_page(service):
    slug, name, en, summary, summary_en, bullets, bullets_en = service
    title = f'{name} | PowerCore Solutions'
    items = ''.join(f'<li><span>✓</span><span data-ar="{esc(ar)}" data-en="{esc(eng)}">{esc(ar)}</span></li>' for ar, eng in zip(bullets, bullets_en))
    return f'''<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#132c4b"><meta name="description" content="{esc(summary)}"><title>{esc(title)}</title><link rel="icon" href="../assets/favicon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="../styles.css"></head>
<body class="service-detail-page"><header class="service-detail-header"><a href="../index.html" aria-label="PowerCore Solutions - الرئيسية"><img src="../assets/powercore-logo.png" alt="PowerCore Solutions"></a><nav><a href="../index.html#services" data-ar="كل الخدمات" data-en="All services">كل الخدمات</a><button id="service-language" type="button">English</button></nav></header>
<main><section class="service-detail-hero"><a class="service-detail-back" href="../index.html#services" data-ar="← العودة إلى الخدمات" data-en="← Back to services">← العودة إلى الخدمات</a><div class="service-detail-kicker" data-ar="خدمات الأعمال بين الصين والسعودية" data-en="Business services between China and Saudi Arabia">خدمات الأعمال بين الصين والسعودية</div><h1 data-ar="{esc(name)}" data-en="{esc(en)}">{esc(name)}</h1><p data-ar="{esc(summary)}" data-en="{esc(summary_en)}">{esc(summary)}</p><a class="button button-primary" href="../index.html#quote"><span data-ar="ناقش احتياجك" data-en="Discuss your needs">ناقش احتياجك</span><b>←</b></a></section>
<section class="service-detail-content"><div><div class="section-kicker"><span>PC</span><span data-ar="كيف يمكن أن تبدأ؟" data-en="How can we start?">كيف يمكن أن تبدأ؟</span></div><h2 data-ar="نحدد نطاق العمل معك." data-en="We define the scope with you.">نحدد نطاق العمل معك.</h2><p data-ar="تختلف تفاصيل الخدمة بحسب نوع المنتج والمورد ومتطلبات المشروع. نراجع ما تحتاجه أولاً، ثم نتفق على الخطوات والنطاق قبل اعتماد العمل." data-en="Service details depend on the product, supplier, and project requirements. We first review your needs, then agree on scope and steps before work is approved.">تختلف تفاصيل الخدمة بحسب نوع المنتج والمورد ومتطلبات المشروع. نراجع ما تحتاجه أولاً، ثم نتفق على الخطوات والنطاق قبل اعتماد العمل.</p></div><ul class="service-detail-list">{items}</ul></section>
<aside class="service-detail-note"><b data-ar="للبدء، شاركنا" data-en="To get started, share">للبدء، شاركنا</b><span data-ar="نوع المنتج أو المشروع، الكمية التقريبية إن وجدت، وأي مواصفات أو صور تساعد على فهم الطلب." data-en="The product or project type, approximate quantity if available, and any specifications or images that help explain the request.">نوع المنتج أو المشروع، الكمية التقريبية إن وجدت، وأي مواصفات أو صور تساعد على فهم الطلب.</span><a href="../index.html#quote" data-ar="اذهب إلى نموذج الطلب ←" data-en="Go to the request form →">اذهب إلى نموذج الطلب ←</a></aside></main>
<footer class="service-detail-footer"><a href="../index.html">PowerCore Solutions</a><span>Riyadh, Saudi Arabia · <a dir="ltr" href="tel:+966533689666">+966 53 368 9666</a></span></footer>
<script>const b=document.getElementById('service-language');b.addEventListener('click',()=>{{const en=document.documentElement.lang!=='en';document.documentElement.lang=en?'en':'ar';document.documentElement.dir=en?'ltr':'rtl';document.querySelectorAll('[data-ar][data-en]').forEach(n=>n.textContent=en?n.dataset.en:n.dataset.ar);document.title=en?'{esc(en)} | PowerCore Solutions':'{esc(title)}';b.textContent=en?'العربية':'English'}});</script></body></html>'''

for item in SERVICES:
    (OUT / f'{item[0]}.html').write_text(make_page(item), encoding='utf-8')

index = ROOT / 'index.html'
html = index.read_text(encoding='utf-8')
card_titles = ['الاستيراد والتصدير','التصنيع','فحص المنتجات والجودة','التخزين في الصين','تطوير المشاريع','التسويق والمسح الميداني','تصميم الشعارات','تسهيلات زيارة الصين','الشهادات والتراخيص','التخليص الجمركي']
for title, item in zip(card_titles, SERVICES):
    old = f'<h3>{title}</h3>'
    new = f'<h3><a class="service-title-link" href="services/{item[0]}.html">{title}</a></h3>'
    if old in html:
        html = html.replace(old, new, 1)
    elif new not in html:
        raise RuntimeError(f'Could not find service title: {title}')
# Make each existing audience card point to a relevant service page.
audience_links = ['services/import-export.html','services/import-export.html','services/manufacturing.html','services/project-development.html']
for href in audience_links:
    old = '<a href="#services">استكشف الخدمات <b>←</b></a>'
    new = f'<a href="{href}">استكشف الخدمات <b>←</b></a>'
    if old in html:
        html = html.replace(old, new, 1)
    elif new not in html:
        raise RuntimeError(f'Could not find audience link for {href}')
index.write_text(html, encoding='utf-8')
# Add the company profile download to the existing footer links.
old = '<a href="#privacy">إشعار الخصوصية</a>'
new = old + '<a href="output/pdf/powercore-company-profile.pdf" download>تحميل الملف التعريفي</a>'
if 'output/pdf/powercore-company-profile.pdf' not in html:
    html = html.replace(old, new, 1)
index.write_text(html, encoding='utf-8')
print(f'Created {len(SERVICES)} service detail pages and linked services/audiences in index.html')
