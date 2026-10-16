const menuToggle=document.querySelector('.menu-toggle');
const mainNav=document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>{const isOpen=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));menuToggle.setAttribute('aria-label',window.siteLocale==='en'?(isOpen?'Close menu':'Open menu'):(isOpen?'إغلاق القائمة':'فتح القائمة'))});
mainNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
const requestBuilder=document.querySelector('.request-builder');
const floatingWhatsappButton=document.querySelector('.floating-whatsapp');
if(requestBuilder&&floatingWhatsappButton&&'IntersectionObserver'in window){
  const requestBuilderObserver=new IntersectionObserver(entries=>{
    floatingWhatsappButton.classList.toggle('is-obscured',entries.some(entry=>entry.isIntersecting));
  },{threshold:0});
  requestBuilderObserver.observe(requestBuilder);
}
const zoomableImages=[...document.querySelectorAll('.showcase-product,.case-image img')];
const productViewer=document.getElementById('product-viewer');
const viewerImage=document.getElementById('viewer-image');
const viewerCaption=document.getElementById('viewer-caption');
zoomableImages.forEach(image=>{
  image.tabIndex=0;
  image.setAttribute('role','button');
  image.setAttribute('aria-label','تكبير صورة المنتج');
  const openViewer=()=>{
    viewerImage.src=image.currentSrc||image.src;
    viewerImage.alt=image.alt;
    viewerCaption.textContent=image.alt;
    productViewer.showModal();
  };
  image.addEventListener('click',openViewer);
  image.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openViewer()}});
});
productViewer.addEventListener('click',event=>{if(event.target===productViewer)productViewer.close()});

// Replace with the company's WhatsApp number in international format, without + or spaces.
const WHATSAPP_NUMBER='966533689666';
document.getElementById('quote-form').addEventListener('submit',event=>{
  event.preventDefault();
  const form=new FormData(event.currentTarget);
  const services=form.getAll('services');
  const hint=document.getElementById('form-hint');
  if(!services.length){
    hint.textContent=window.siteLocale==='en'?'Choose at least one service to continue.':'اختر خدمة واحدة على الأقل للمتابعة.';
    event.currentTarget.querySelector('input[name="services"]').focus();
    return;
  }
  const serviceList=services.map(localizedService).join(window.siteLocale==='en'?', ':'، ');
  const lines=window.siteLocale==='en'?[`Hello, I'd like to request a quote from PowerCore Solutions.`,`Name: ${form.get('name')}`,`Contact number: ${form.get('phone')}`,`Requested services: ${serviceList}`,form.get('details')?`Request details: ${form.get('details')}`:''].filter(Boolean):['السلام عليكم، أرغب بطلب عرض سعر من PowerCore Solutions.',`الاسم: ${form.get('name')}`,`رقم التواصل: ${form.get('phone')}`,`الخدمات المطلوبة: ${serviceList}`,form.get('details')?`تفاصيل الطلب: ${form.get('details')}`:''].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
});
document.querySelectorAll('#quote-form input[name="services"]').forEach(input=>input.addEventListener('change',()=>{
  if([...document.querySelectorAll('#quote-form input[name="services"]')].some(item=>item.checked)){
    document.getElementById('form-hint').textContent=window.siteLocale==='en'?'WhatsApp will open with your message when you press the button.':'سيتم فتح واتساب لإرسال رسالتك بعد الضغط على الزر.';
  }
}));
const showcaseFilters=[...document.querySelectorAll('.showcase-filter')];
showcaseFilters.forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  showcaseFilters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});
  document.querySelectorAll('.showcase-card[data-category]').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter});
}));
document.getElementById('request-builder-form').addEventListener('submit',event=>{
  event.preventDefault();
  const form=new FormData(event.currentTarget);
  const kindNames={ready:{ar:'توريد منتج جاهز',en:'Sourcing a ready-made product'},manufacture:{ar:'تصنيع منتج',en:'Product manufacturing'},shipment:{ar:'تجهيز أو شحن بضائع',en:'Preparing or shipping goods'},project:{ar:'تطوير مشروع أو زيارة الصين',en:'Project development or a China visit'}};
  const isEnglish=window.siteLocale==='en';
  const productNames=isEnglish?{ppf:'Paint protection film (PPF)',tint:'Automotive window tint film',other:'Other product'}:{ppf:'أفلام حماية الطلاء PPF',tint:'أفلام تظليل نوافذ السيارات',other:'منتج آخر'};
  const kind=kindNames[form.get('kind')];
  const selectedBuilderServices=form.getAll('builder_services').map(localizedService);
  const supplierValue=form.get('supplier');
  const supplierNames=isEnglish?{yes:'Yes',no:'No',unknown:'Not yet'}:{yes:'نعم',no:'لا',unknown:'غير محدد بعد'};
  const shippingNames=isEnglish?{sea:'Sea freight',air:'Air freight',express:'Express'}:{sea:'بحري',air:'جوي',express:'سريع'};
  const lines=isEnglish?[
    'Hello, I would like to discuss a request with PowerCore Solutions.',
    `Request type: ${kind.en}`,
    form.get('product')?`Product: ${productNames[form.get('product')]}`:'',
    selectedBuilderServices.length?`Additional services: ${selectedBuilderServices.join(', ')}`:'',
    `Approximate quantity: ${form.get('quantity')||'Not specified'}`,
    form.get('city')?`Delivery city: ${form.get('city')}`:'',
    form.get('shipping')?`Preferred shipping method: ${shippingNames[form.get('shipping')]}`:'',
    `Supplier in China: ${supplierNames[supplierValue]}`,
    form.get('notes')?`Specifications or notes: ${form.get('notes')}`:''
  ].filter(Boolean):[
    'السلام عليكم، أرغب بمناقشة طلب مع PowerCore Solutions.',
    `نوع الطلب: ${kind.ar}`,
    form.get('product')?`المنتج: ${productNames[form.get('product')]}`:'',
    selectedBuilderServices.length?`خدمات مساندة: ${selectedBuilderServices.join('، ')}`:'',
    `الكمية التقريبية: ${form.get('quantity')||'غير محددة'}`,
    form.get('city')?`مدينة التسليم: ${form.get('city')}`:'',
    form.get('shipping')?`طريقة الشحن المفضلة: ${shippingNames[form.get('shipping')]}`:'',
    `هل لدي مورد في الصين؟ ${supplierNames[supplierValue]}`,
    form.get('notes')?`مواصفات أو ملاحظات: ${form.get('notes')}`:''
  ].filter(Boolean);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
});
const shippingPriority=document.getElementById('shipping-priority');
function updateShippingAdvice(){
  const advice=document.getElementById('shipping-advice');
  const adviceAr={speed:'قارن بين الجوي والسريع حسب حجم الشحنة وقبول الناقل لنوع المنتج.',volume:'قد يكون البحري خياراً للمقارنة عند الكميات الأكبر؛ راجع المناولة والتخليص والوجهة ضمن التكلفة.',parcel:'قارن السريع والجوي حسب الوزن والأبعاد والوجهة، وتأكد من قبول نوع المنتج.'};
  const adviceEn={speed:'Compare air and express options against shipment size and carrier acceptance for the product.',volume:'Sea freight may be worth comparing for larger quantities; include handling, clearance, and destination in the cost.',parcel:'Compare express and air options by weight, dimensions, and destination, and confirm the product is accepted.'};
  const messages=window.siteLocale==='en'?adviceEn:adviceAr;
  advice.textContent=messages[shippingPriority.value]||'';
  advice.hidden=!shippingPriority.value;
}
shippingPriority.addEventListener('change',updateShippingAdvice);

const goalServices={
  source:['الاستيراد والتصدير'],
  make:['التصنيع','الشهادات والتراخيص'],
  ship:['الشحن والتخليص الجمركي','التخزين في الصين'],
  grow:['تطوير المشاريع','التسويق والمسح الميداني','تسهيلات زيارة الصين'],
  brand:['تصميم الشعارات','التصنيع','الاستيراد والتصدير']
};
const goalNames={
  source:'أبحث عن منتج أو مورد',
  make:'أريد تصنيع منتج',
  ship:'لدي بضائع وأحتاج تجهيزها للشحن',
  grow:'أطور مشروعاً أو أزور الصين',
  brand:'أطلق علامة أو أجهز منتجاً للسوق'
};
let selectedGoal='';
const goalButtons=[...document.querySelectorAll('.goal-option')];
const followups=document.getElementById('assistant-followups');
const recommendations=document.getElementById('recommendations');
const chips=document.getElementById('recommendation-chips');
const assistantLink=document.getElementById('assistant-whatsapp');
const supplierAnswer=document.getElementById('supplier-answer');
const qualityAnswer=document.getElementById('quality-answer');
const serviceCheckboxes=[...document.querySelectorAll('#quote-form input[name="services"]')];
serviceCheckboxes.forEach(input=>input.addEventListener('change',()=>{input.dataset.userTouched='true'}));
document.querySelectorAll('.service-card>a').forEach((link,index)=>link.addEventListener('click',()=>{
  const checkbox=serviceCheckboxes[index];
  if(checkbox){
    checkbox.checked=true;
    checkbox.dataset.userTouched='true';
    document.getElementById('form-hint').textContent=window.siteLocale==='en'?'The selected service has been added to your request.':'تمت إضافة الخدمة المحددة إلى طلبك.';
  }
}));
function recommendedServices(){
  if(!selectedGoal)return [];
  const services=[...goalServices[selectedGoal]];
  if(supplierAnswer.value==='no'&&!services.includes('التسويق والمسح الميداني'))services.push('التسويق والمسح الميداني');
  if(qualityAnswer.value==='yes'&&!services.includes('فحص المنتجات ومراقبة الجودة'))services.push('فحص المنتجات ومراقبة الجودة');
  return services;
}
function updateRecommendations(){
  if(!selectedGoal)return;
  const services=recommendedServices();
  chips.replaceChildren(...services.map(service=>{const chip=document.createElement('span');chip.className='recommendation-chip';chip.textContent=localizedService(service);return chip}));
  assistantLink.href='#quote';
}
assistantLink.addEventListener('click',event=>{
  if(!selectedGoal)return;
  event.preventDefault();
  const services=recommendedServices();
  const aliases={'الشحن والتخليص الجمركي':'التخليص الجمركي'};
  serviceCheckboxes.forEach(input=>{
    if(input.dataset.assistantAdded==='true'&&input.dataset.userTouched!=='true')input.checked=false;
    input.dataset.assistantAdded='false';
  });
  services.forEach(service=>{
    const value=aliases[service]||service;
    const checkbox=serviceCheckboxes.find(input=>input.value===value);
    if(checkbox&&!checkbox.checked){checkbox.checked=true;checkbox.dataset.assistantAdded='true'}
  });
  const isEnglish=window.siteLocale==='en';
  const details=document.querySelector('#quote-form textarea[name="details"]');
  const marker=isEnglish?'Service finder notes:':'ملاحظات مساعد الخدمات:';
  const context=isEnglish?`${marker} ${goalNamesEn[selectedGoal]}\nSupplier in China: ${supplierAnswer.options[supplierAnswer.selectedIndex].text}\nQuality inspection: ${qualityAnswer.options[qualityAnswer.selectedIndex].text}`:`${marker} ${goalNames[selectedGoal]}\nالمورد في الصين: ${supplierAnswer.options[supplierAnswer.selectedIndex].text}\nفحص الجودة: ${qualityAnswer.options[qualityAnswer.selectedIndex].text}`;
  if(!details.value.includes(marker))details.value=details.value?[details.value,context].join('\n\n'):context;
  document.getElementById('form-hint').textContent=isEnglish?'Recommended services have been added to your request.':'تمت إضافة الخدمات المقترحة إلى طلبك.';
  document.getElementById('quote').scrollIntoView({behavior:'smooth'});
});
goalButtons.forEach(button=>button.addEventListener('click',()=>{
  selectedGoal=button.dataset.goal;
  goalButtons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  document.querySelector('.assistant-count').textContent=window.siteLocale==='en'?'Need selected':'تم اختيار احتياجك';
  followups.hidden=false;
  recommendations.hidden=false;
  updateRecommendations();
}));
[supplierAnswer,qualityAnswer].forEach(select=>select.addEventListener('change',updateRecommendations));
document.getElementById('reset-assistant').addEventListener('click',()=>{
  selectedGoal='';
  goalButtons.forEach(item=>item.setAttribute('aria-pressed','false'));
  supplierAnswer.value='unknown';
  qualityAnswer.value='unknown';
  document.querySelector('.assistant-count').textContent=window.siteLocale==='en'?'Choose an option':'اختر خياراً';
  followups.hidden=true;
  recommendations.hidden=true;
});

const textEn={
  'PowerCore Solutions | شريكك التجاري بين الصين والسعودية':'PowerCore Solutions | Your China–Saudi Business Partner','الكل':'All','منتجات السيارات':'Automotive products','الشحن والتوريد':'Shipping and sourcing','تحميل الملف التعريفي':'Download company profile','تصفية أمثلة التوريد':'Filter sourcing examples',
  'عرض صورة المنتج بحجم أكبر':'View the product image at a larger size','تكبير صورة المنتج':'Enlarge product image','إغلاق الصورة':'Close image',
  'أكمل طلب السعر بهذه الخدمات':'Continue your quote request with these services',
  'الخدمات المطلوبة':'Services requested','اختر خدمة واحدة أو أكثر':'Choose one or more services','الاسم ورقم التواصل والخدمة أو الخدمات المطلوبة وتفاصيل الطلب التي تختار كتابتها.':'Your name, contact number, requested service or services, and any request details you choose to enter.',
  'راسلنا عبر واتساب':'Message us on WhatsApp',
  'قارن بين طرق الشحن':'Compare shipping methods','مقارنة عامة تساعدك على بدء النقاش؛ القرار يعتمد على تفاصيل البضائع والمسار.':'A general comparison to start the discussion. The choice depends on cargo and route details.','الشحن الجوي':'Air freight','قد يناسب الشحنات التي تحتاج وصولاً أسرع من الشحن البحري.':'May suit shipments that need to arrive sooner than sea freight.','انتبه إلى الوزن الحجمي وطبيعة المنتج.':'Consider volumetric weight and product type.','الشحن البحري':'Sea freight','قد يناسب الكميات الأكبر مع مرونة أكبر في وقت الوصول.':'May suit larger quantities with more flexibility on arrival timing.','راجع حجم الشحنة ومناولة الميناء والتخليص.':'Consider shipment volume, port handling, and customs clearance.','الشحن السريع':'Express shipping','قد يناسب الطرود الصغيرة أو المستندات بحسب الوجهة.':'May suit small parcels or documents, depending on the destination.','تحقق من حدود الوزن وقبول نوع المنتج.':'Check weight limits and whether the product is accepted.','ما أولويتك؟':'What is your priority?','اختر أولوية للمقارنة':'Choose a priority to compare','السرعة':'Speed','كمية أو حجم أكبر':'Larger quantity or volume','طرد صغير أو مستندات':'Small parcel or documents','الأسعار والمدد وقبول البضائع تختلف حسب الوزن والأبعاد والمنتج والوجهة والناقل؛ اطلب عرضاً مخصصاً قبل اتخاذ القرار.':'Prices, timing, and cargo acceptance vary by weight, dimensions, product, destination, and carrier. Request a tailored quote before deciding.',
  'مصطلحات تتكرر في التوريد':'Common sourcing terms','افتح المصطلح لقراءة شرح مبسّط.':'Open a term for a simple explanation.','المورد':'Supplier','الجهة التي تبيع المنتج أو تصنّعه. قد يكون مصنعاً أو شركة تجارة، ويُتحقق من ملاءمته حسب الطلب.':'The party that sells or manufactures a product. It may be a factory or trading company; its suitability is assessed for each request.','العينة':'Sample','كمية أو قطعة تُراجع قبل طلب كمية أكبر، لمقارنة المنتج بالمواصفات المتفق عليها.':'A piece or quantity reviewed before placing a larger order, to compare the product with agreed specifications.','فحص الجودة':'Quality inspection','مراجعة محددة للمنتج أو الكمية وفق نقاط فحص يتفق عليها مسبقاً؛ نطاق الفحص يختلف من طلب لآخر.':'A defined review of a product or quantity against agreed checkpoints; inspection scope varies by request.','تجميع الشحنات':'Shipment consolidation','تنسيق بضائع من أكثر من مورد لتجهيزها معاً، إذا سمحت طبيعة البضائع وخيارات التخزين والشحن.':'Coordinating goods from multiple suppliers for joint preparation, when the goods and storage and shipping options allow.','التخليص الجمركي':'Customs clearance','إجراءات مرتبطة بدخول البضائع عبر المنفذ. تتأثر بنوع المنتج ومستنداته ومتطلبات الجهات المختصة.':'Procedures related to goods entering through a port of entry. They depend on the product, its documents, and requirements of relevant authorities.','هذه تعريفات مبسطة لأغراض التوضيح؛ المصطلحات والإجراءات قد تختلف بحسب سياق الشحنة والجهات ذات العلاقة.':'These simplified definitions are for explanation. Terms and procedures may vary by shipment and relevant authorities.',
  'إشعار الخصوصية':'Privacy notice','بياناتك،':'Your data,','بوضوح.':'clearly.','هذا الإشعار يشرح ما يحدث عند استخدام نموذج الطلب في الموقع.':'This notice explains what happens when you use the website’s request form.','ما المعلومات التي تدخلها؟':'What information do you provide?','الاسم ورقم التواصل والخدمة المطلوبة وتفاصيل الطلب التي تختار كتابتها.':'Your name, contact number, requested service, and any request details you choose to enter.','كيف يفتح واتساب؟':'How does WhatsApp open?','الموقع يجهّز رسالة بهذه التفاصيل ويفتح محادثة واتساب. راجع الرسالة بنفسك؛ لا تُرسل إلى الشركة حتى تضغط «إرسال» داخل واتساب.':'The website prepares a message with these details and opens a WhatsApp chat. Review the message yourself; it is not sent to the company until you press “Send” in WhatsApp.','هل يخزّن الموقع طلبك؟':'Does the website store your request?','الموقع لا يرسل بيانات النموذج إلى خادم خاص به. بعد إرسال الرسالة، تتم متابعة المحادثة عبر واتساب وفق خدمة واتساب وإجراءات الشركة.':'The website does not send form data to its own server. After you send the message, the conversation continues through WhatsApp and is handled under WhatsApp’s service and the company’s procedures.','ما الذي يستحسن عدم إرساله؟':'What should you avoid sending?','لا تكتب معلومات حساسة لا نحتاجها لمناقشة طلبك، مثل بيانات الحسابات البنكية أو صور المستندات الشخصية.':'Do not include sensitive information we do not need to discuss your request, such as bank account details or images of personal documents.','تفضيلات الموقع والخطوط':'Site preferences and fonts','يحفظ المتصفح اختيار اللغة لتذكره عند زيارتك لاحقاً، كما يحمّل الموقع الخط المستخدم من خدمة Google Fonts.':'Your browser saves your language choice for your next visit, and the site loads its font from Google Fonts.','للاستفسار عن طلب أرسلته، تواصل مع الشركة عبر واتساب.':'To ask about a request you sent, contact the company on WhatsApp.','إشعار مختصر عن آلية النموذج الحالية، وليس بديلاً عن سياسة خصوصية الشركة. قبل نشر الموقع، ينبغي اعتماد سياسة الشركة وتفاصيلها الرسمية.':'A brief notice about the form’s current operation, not a substitute for the company’s privacy policy. The company should approve its official policy and details before the website is published.',
  'ما نوع احتياجك؟':'What do you need?','اختر نوع الطلب':'Choose a request type','توريد منتج جاهز':'Sourcing a ready-made product','تجهيز أو شحن بضائع':'Preparing or shipping goods','تطوير مشروع أو زيارة الصين':'Project development or a China visit','نوع المنتج':'Product type','اختر المنتج إن عرفت':'Choose a product if known','أفلام حماية الطلاء PPF':'Paint protection film (PPF)','أفلام تظليل نوافذ السيارات':'Automotive window tint film','منتج آخر':'Other product','الكمية التقريبية':'Approximate quantity','هل لديك مورد في الصين؟':'Do you have a supplier in China?','غير محدد بعد':'Not yet specified','نعم':'Yes','لا':'No','مدينة التسليم':'Delivery city','مثال: الرياض':'Example: Riyadh','طريقة الشحن إن عُرفت':'Shipping method, if known','غير محددة':'Not specified','بحري':'Sea freight','جوي':'Air freight','سريع':'Express','مواصفات أو ملاحظات':'Specifications or notes','مثال: 100 قطعة أو غير محدد':'Example: 100 pieces or not specified','الاستخدام، المقاس، الخامة، أو أي تفاصيل تعرفها':'Use, size, material, or any details you know','جهّز رسالة طلبك':'Prepare your request message','أجب عن هذه النقاط، وسنرتبها لك في رسالة جاهزة للإرسال عبر واتساب.':'Answer these prompts and we’ll format them into a message ready to send on WhatsApp.','جهّز الرسالة عبر واتساب':'Prepare message on WhatsApp',
  'دليل الاستيراد':'Import guide','معلومة عملية،':'Practical guidance,','قبل أول طلب.':'before your first order.','إرشادات أولية تساعدك على تجهيز طلبك والتواصل بوضوح مع المورد. تختلف التفاصيل بحسب المنتج والمشروع.':'Initial guidance to help prepare your request and communicate clearly with a supplier. Details vary by product and project.','كيف تحدد مواصفات المنتج؟':'How do you define product specifications?','اكتب ما تحتاجه بوضوح قبل طلب الأسعار أو التصنيع.':'Write down what you need clearly before requesting prices or manufacturing.','اقرأ الإرشادات':'Read the tips','حدد الاستخدام والخامة والأبعاد أو المقاس.':'Specify the intended use, material, and dimensions or size.','أرفق صوراً أو رسماً، وميّز بين المطلوب والاختياري.':'Attach photos or a drawing and distinguish required features from optional ones.','وضح نوع التغليف والكمية التقريبية إن أمكن.':'Describe the packaging type and approximate quantity if possible.','ما فائدة طلب عينة؟':'Why request a sample?','العينة تساعدك على مراجعة المنتج قبل الانتقال إلى طلب أكبر.':'A sample helps you review the product before moving to a larger order.','قارن العينة بالمواصفات التي أرسلتها للمورد.':'Compare the sample with the specifications you sent to the supplier.','دوّن ملاحظاتك واطلب التعديلات بوضوح.':'Record your feedback and clearly request any changes.','اتفق مع المورد على اعتماد العينة قبل الإنتاج، إذا كان ذلك مناسباً.':'If appropriate, agree with the supplier to approve the sample before production.','ماذا تراجع قبل الشحن؟':'What should you review before shipping?','حدد مسبقاً ما تريد فحصه وكيف ستتم مشاركة النتيجة.':'Decide in advance what you want inspected and how the results will be shared.','حدد الكمية والموديل والمواصفات التي ينبغي مطابقتها.':'Specify the quantity, model, and requirements to be checked.','ناقش صور الفحص أو تقريره ونطاقه قبل ترتيب الخدمة.':'Discuss inspection photos or reports and the scope before arranging the service.','راجع التعبئة والعلامات الخارجية قبل اعتماد تجهيز الشحنة.':'Review packaging and external markings before confirming shipment preparation.','تنبيه':'Note','هذه إرشادات عامة وليست بديلاً عن التحقق من اشتراطات المنتج والجهات المختصة. نراجع المتطلبات ذات الصلة ضمن تفاصيل كل طلب.':'This is general guidance and does not replace checking product requirements with relevant authorities. Applicable requirements are reviewed as part of each request.','ناقش منتجك معنا':'Discuss your product with us',
  'الوضوح والثقة':'Clarity and trust','تعرف على الخطوات،':'Know the steps,','قبل أن تبدأ.':'before you begin.','نحرص على توضيح نطاق الخدمة والتفاصيل المتاحة قبل تنسيق التنفيذ، لأن كل منتج وشحنة لها متطلباتها.':'We aim to clarify the service scope and available details before coordinating execution, since every product and shipment has its own requirements.','نفهم احتياجك':'We understand your needs','نراجع نوع المنتج أو المشروع والكمية والخدمات التي تبحث عنها.':'We review the product or project type, quantity, and services you are looking for.','نوضح نطاق العمل':'We clarify the scope','نناقش الخدمات المناسبة والتفاصيل المتاحة، ثم نوضح العرض قبل بدء التنفيذ.':'We discuss suitable services and available details, then clarify the proposal before work begins.','ننسق وفق الاتفاق':'We coordinate as agreed','نتابع خطوات العمل المتفق عليها ونتواصل معك بشأن المستجدات ذات الصلة.':'We follow the agreed steps and communicate relevant updates.','معلومة مهمة':'Please note','التكلفة والمدة والمتطلبات تعتمد على نوع المنتج ومواصفاته وطريقة الشحن وإجراءات الجهات المعنية؛ وتُراجع تفاصيلها لكل طلب.':'Cost, timing, and requirements depend on the product, specifications, shipping method, and relevant authority procedures; details are reviewed for each request.',
  'من نحن':'About us','خدماتنا':'Services','مجالات التوريد':'Supply examples','مشاريعنا':'Our work','اطّلع على أمثلة التوريد':'View sourcing examples','كتالوج المنتجات (عربي)':'Product catalog (Arabic)','كتالوج المنتجات (English)':'Product catalog (English)','الملف التعريفي (عربي)':'Company profile (Arabic)','الملف التعريفي (English)':'Company profile (English)','كيف نعمل':'How it works','مساعد الخدمات':'Service finder','الأسئلة الشائعة':'FAQs','تواصل معنا':'Contact','اطلب عرض سعر':'Request a quote',
  'من نخدم؟':'Who we serve','لكل نشاط،':'For every business,','بداية تناسبه.':'a fitting starting point.','ننسق خدماتنا بحسب احتياجك وطبيعة مشروعك. اختر الفئة الأقرب لك للاطلاع على أمثلة الخدمات ذات الصلة.':'We coordinate services around your needs and project. Choose the group closest to you to see relevant service examples.','01 / RETAIL':'01 / RETAIL','المتاجر والتجارة الإلكترونية':'Retail and e-commerce','لمن يبحث عن منتجات وموردين أو يجهز شحنة للسوق السعودي.':'For those sourcing products and suppliers or preparing a shipment for the Saudi market.','02 / BUSINESS':'02 / BUSINESS','الشركات والتجار':'Companies and traders','لتنسيق عمليات الشراء والاستيراد ومتابعة البضائع قبل الشحن.':'For coordinating purchasing and imports and following up on goods before shipping.','03 / PRODUCTS':'03 / PRODUCTS','المصانع وأصحاب المنتجات':'Manufacturers and product owners','لمن يطور منتجاً أو يبحث عن التصنيع ومتابعة مواصفاته.':'For those developing a product or seeking manufacturing and specification follow-up.','04 / STARTUPS':'04 / STARTUPS','رواد الأعمال وأصحاب الأفكار':'Entrepreneurs and founders','لمن يبدأ مشروعاً جديداً أو يحتاج إلى فهم السوق وخيارات التنفيذ.':'For those starting a new project or exploring the market and ways to execute it.','البحث والتوريد':'Sourcing','الشحن والتخليص':'Shipping and customs clearance','استكشف الخدمات':'Explore services','التخزين':'Warehousing','المسح الميداني':'Field research','زيارة الصين':'China visit','متابعة المواصفات':'Specification follow-up',
  'شريكك التجاري بين الصين والسعودية':'Your business partner between China and Saudi Arabia','فكرتك تبدأ من هنا.':'Your idea starts here.','ونرافقها حتى تصل.':'We help take it all the way.','من البحث عن المورد والتصنيع، إلى فحص الجودة والشحن والتخليص — ننسق لك رحلة الاستيراد بخطوات واضحة وشريك واحد.':'From supplier sourcing and manufacturing to quality checks, shipping, and customs clearance, we coordinate your import journey with clear steps and one partner.','ابدأ مشروعك معنا':'Start your project with us','اكتشف خدماتنا':'Explore our services','من الصين إلى المملكة العربية السعودية':'From China to Saudi Arabia','الصين':'China','السعودية':'Saudi Arabia','رحلة أعمالك':'Your business journey','من أول خطوة… إلى وصول شحنتك':'From the first step to your shipment’s arrival','جودة تتابعها':'Quality you can follow','من المصدر':'At the source','حلول متكاملة':'Integrated solutions','تحت سقف واحد':'All in one place','نحوّل تعقيد التجارة إلى خطوات أسهل':'We make cross-border trade easier to navigate','مرر للتعرّف علينا':'Scroll to learn more',
  'من نحن':'About us','أكثر من شحن.':'More than shipping.','شريك يربط لك الطريق.':'A partner to connect the whole journey.','PowerCore Solutions شركة سعودية مقرها الرياض، تساعد الأفراد والمنشآت على تنفيذ أعمالهم في الصين. نجمع خدمات التوريد والتصنيع والفحص والخدمات اللوجستية في تجربة واحدة تبدأ بفهم احتياجك.':'PowerCore Solutions is a Saudi company based in Riyadh, helping individuals and businesses carry out projects in China. We bring sourcing, manufacturing, inspection, and logistics support together, starting with understanding your needs.','تعرّف على طريقة عملنا':'See how we work','نقطة وصل':'Connecting point','بين سوقين':'Two markets',
  'رحلة مشروعك':'Your project journey','من الفكرة إلى الوصول.':'From idea to arrival.','خطوة بخطوة.':'Step by step.','كل مشروع له مساره. ننسق الخدمات التي تناسب احتياجك، من أول بحث وحتى وصول المنتجات إلى وجهتها.':'Every project has its own route. We coordinate the services you need, from initial research through delivery.','في الصين':'In China','اكتشاف الفرصة':'Explore the opportunity','مسح ميداني، بحث عن منتج أو مورد، وتطوير فكرة المشروع.':'Market research, product or supplier sourcing, and project development.','التجهيز':'Preparation','التصنيع والاستعداد':'Manufacturing and preparation','تنسيق التصنيع، متابعة المواصفات، وتجهيز الشهادات اللازمة.':'Coordinate manufacturing, follow specifications, and arrange required certifications.','قبل الشحن':'Before shipping','الفحص والتخزين':'Inspection and storage','فحص المنتجات ومراقبة الجودة، مع خيارات تخزين في الصين.':'Product inspection and quality checks, with storage options in China.','إلى السعودية':'To Saudi Arabia','الشحن والتخليص':'Shipping and customs clearance','تنسيق الشحن والتخليص الجمركي وفق تفاصيل ومتطلبات الشحنة.':'Coordinate shipping and customs clearance based on the shipment details and requirements.','ليست كل المراحل مطلوبة لكل مشروع — نرتب المسار حسب احتياجك.':'Not every project needs every stage. We tailor the route to your needs.',
  'كل ما يحتاجه مشروعك،':'What your project needs,','في مكان واحد.':'in one place.','حلول مرنة تغطي مراحل عملك مع الصين — اختر الخدمة التي تحتاجها أو دعنا ننسق لك الرحلة كاملة.':'Flexible support for your work with China. Choose a service or let us coordinate the full journey.','الاستيراد والتصدير':'Import and export','تنسيق عمليات الشراء والتجارة بين الموردين في الصين والسوق السعودي.':'Coordinate purchasing and trade between suppliers in China and the Saudi market.','التصنيع':'Manufacturing','مساندة مشروعك في الوصول إلى خيارات تصنيع مناسبة في الصين.':'Find suitable manufacturing options in China for your project.','فحص المنتجات والجودة':'Product inspection and quality control','متابعة مواصفات المنتجات وجودتها قبل إتمام الشحن.':'Check product specifications and quality before shipment.','فحص المنتجات ومراقبة الجودة':'Product inspection and quality control','التخزين في الصين':'Warehousing in China','خيارات تخزين لتنسيق بضائعك وتجهيزها قبل الشحن.':'Storage options to organize and prepare your goods before shipping.','تطوير المشاريع':'Project development','مساندة عملية لتحويل فكرة المشروع إلى خطوات قابلة للتنفيذ.':'Practical support to turn a project idea into actionable steps.','التسويق والمسح الميداني':'Marketing and field research','جمع معلومات ميدانية تساعدك على فهم السوق والفرص في الصين.':'Gather on-the-ground information to help you understand the market and opportunities in China.','تصميم الشعارات':'Logo design','تصميم هوية وشعار يعكسان شخصية مشروعك أو علامتك التجارية.':'Create a logo and identity that reflect your project or brand.','تسهيلات زيارة الصين':'China visit assistance','تنسيق الخدمات المساندة لرحلة عملك وزيارتك إلى الصين.':'Coordinate support services for your business trip to China.','الشهادات والتراخيص':'Certificates and licenses','مساعدة في متابعة متطلبات الشهادات والتراخيص المرتبطة بمنتجاتك.':'Help follow up on certificates and licenses related to your products.','التخليص الجمركي':'Customs clearance','تنسيق إجراءات التخليص بحسب نوع الشحنة ومتطلباتها.':'Coordinate clearance procedures based on your shipment and its requirements.','تحتاج أكثر من خدمة؟ ننسقها لك ضمن خطة واحدة.':'Need more than one service? We can coordinate them in one plan.','احكِ لنا عن مشروعك':'Tell us about your project',
  'نماذج من مجالات التوريد':'Supply examples','أمثلة واقعية،':'Real product examples,','وتفاصيل تبقى خاصة.':'with private details kept confidential.','صور المنتجين من المواد التي زودتنا بها الشركة، والرسم الخاص بتنسيق الشحن توضيحي. لا يتضمن المعرض بيانات العملاء أو الأسعار.':'The two product photos were provided by the company; the shipping coordination illustration is conceptual. No customer details or prices are shown.','العناية بالسيارات':'Automotive care','أفلام حماية الطلاء PPF':'Paint protection film (PPF)','مثال على توريد رولات أفلام حماية شفافة للسيارات.':'An example of supplying rolls of clear automotive paint protection film.','توريد منتجات':'Product supply','حلول العزل':'Insulation solutions','أفلام العزل الحراري':'Automotive window tint film','مثال على توريد رولات أفلام عازلة للاستخدام في السيارات.':'An example of supplying rolls of film for automotive windows.','SUPPLY / CONCEPT':'SUPPLY / CONCEPT','تنسيق الشحن':'Shipping coordination','من المورد إلى مخزن العميل':'From supplier to customer warehouse','تنسيق توريد المنتجات وشحنها، مع متابعة مراحل الرحلة بحسب الطلب.':'Coordinate product sourcing and shipping, with shipment follow-up based on each request.','توريد وشحن':'Sourcing and shipping',
  'أمثلة على تنسيق التوريد':'Sourcing coordination examples','من احتياج المنتج،':'From product needs,','إلى تجهيز الشحنة.':'to shipment preparation.','نماذج توضيحية مستوحاة من مواد التوريد التي شاركتها الشركة. لا تتضمن أسعاراً أو بيانات عملاء، ولا تمثل ضماناً لنتائج أو مواصفات غير موثقة.':'Illustrative examples based on sourcing materials shared by the company. They omit prices and customer details and do not guarantee outcomes or unverified specifications.','EXAMPLE / 01':'EXAMPLE / 01','توريد أفلام حماية الطلاء':'Paint protection film sourcing','مثال على تنسيق توريد رولات PPF لقطاع العناية بالسيارات، بحسب النوع والمواصفات والكميات التي يحددها العميل.':'An example of coordinating PPF roll sourcing for the automotive care sector, based on the type, specifications, and quantities set by the client.','بحث وتوريد':'Sourcing','متابعة المواصفات':'Specification follow-up','تنسيق الشحن':'Shipping coordination','EXAMPLE / 02':'EXAMPLE / 02','توريد أفلام العزل الحراري':'Automotive window film sourcing','مثال على تجهيز طلب رولات أفلام نوافذ السيارات، مع إمكان تنسيق فحص المنتج وتجميع الشحنة قبل إرسالها.':'An example of preparing an order for automotive window film rolls, with options to coordinate product inspection and consolidate the shipment before dispatch.','تجهيز الطلب':'Order preparation','فحص الجودة':'Quality inspection','التخزين والشحن':'Storage and shipping','تختلف الخدمات المناسبة حسب المنتج والمورد ومتطلبات الشحنة.':'Suitable services vary by product, supplier, and shipment requirements.','أرسل تفاصيل طلبك':'Share your request details',
  'واضحة من أول':'Clear from the first','خطوة.':'step.','نبدأ باحتياجك، وننسق معك كل مرحلة حتى تكون الصورة واضحة قبل اتخاذ القرار.':'We start with your needs and coordinate each stage so you have a clear picture before making decisions.','ناقش مشروعك معنا':'Discuss your project with us','نستمع لاحتياجك':'We learn what you need','تشاركنا فكرتك أو المنتج والخدمة المطلوبة.':'Tell us about your idea, product, or requested service.','نحدد نطاق العمل':'We define the scope','نراجع التفاصيل ونوضح الخدمات والخطوات المناسبة.':'We review the details and outline suitable services and steps.','ننسق التنفيذ':'We coordinate delivery','نتابع الخدمات المتفق عليها معك ومع الأطراف المعنية.':'We follow up on agreed services with you and the relevant parties.','نتابع حتى الوصول':'We follow through to arrival','نبقى على تواصل معك خلال مراحل التجهيز والشحن.':'We stay in touch during preparation and shipping.',
  'خلّنا نوجّهك':'Let us guide you','للبداية المناسبة.':'to the right starting point.','اختر أقرب وصف لاحتياجك، وسنقترح خدمات قد تناسب مشروعك. تقدر تعدل الاختيارات قبل إرسالها لنا.':'Choose the option closest to your needs and we’ll suggest services that may fit. You can adjust your choices before sending them.','دليل مبدئي — تفاصيل الخدمة نحددها معك.':'A starting guide. We’ll confirm service details with you.','ما الذي تعمل عليه؟':'What are you working on?','اختر خياراً':'Choose an option','أبحث عن منتج أو مورد':'I’m looking for a product or supplier','أحتاج مساعدة في التوريد':'I need help with sourcing','أريد تصنيع منتج':'I want to manufacture a product','لدي فكرة أو مواصفات':'I have an idea or specifications','لدي بضائع وأحتاج تجهيزها للشحن':'I have goods to prepare for shipping','فحص، تخزين، شحن أو تخليص':'Inspection, storage, shipping, or clearance','أطور مشروعاً أو أزور الصين':'I’m developing a project or visiting China','أحتاج دعماً ميدانياً أو تنظيمياً':'I need on-the-ground or trip support','أطلق علامة أو أجهز منتجاً للسوق':'I’m launching a brand or preparing a product for market','أحتاج هوية وخدمات تجارية':'I need branding and trade support','هل لديك مورد في الصين؟':'Do you have a supplier in China?','لم أحدد بعد':'Not sure yet','نعم، لدي مورد':'Yes, I have a supplier','لا، أحتاج مساعدة بالبحث':'No, I need help finding one','هل تحتاج فحصاً للجودة؟':'Do you need a quality inspection?','لست متأكداً':'Not sure','نعم، أحتاج فحصاً':'Yes, I need an inspection','لا أحتاجه حالياً':'Not at this time','خدمات قد تناسبك':'Services that may fit','تغيير الاختيار':'Change selection','هذا اقتراح مبدئي؛ نراجع التفاصيل معك قبل تحديد نطاق العمل.':'This is an initial suggestion. We’ll review the details before defining the scope.','أرسل اختياراتي عبر واتساب':'Send my choices on WhatsApp','تم اختيار احتياجك':'Need selected','الشحن والتخليص الجمركي':'Shipping and customs clearance',
  'إجابات تساعدك':'Answers to help you','تبدأ بوضوح.':'start with clarity.','ما لقيت إجابة سؤالك؟ أرسل لنا استفسارك على واتساب ونساعدك في معرفة الخطوة المناسبة.':'Didn’t find your answer? Message us on WhatsApp and we’ll help you identify the next step.','تواصل معنا عبر واتساب':'Contact us on WhatsApp','ما الخدمات التي تقدمها PowerCore Solutions؟':'What services does PowerCore Solutions offer?','نقدم خدمات الاستيراد والتصدير، التصنيع، فحص المنتجات ومراقبة الجودة، التخزين في الصين، تطوير المشاريع، التسويق والمسح الميداني، تصميم الشعارات، تسهيلات زيارة الصين، استخراج الشهادات والتراخيص، والتخليص الجمركي.':'We offer import and export, manufacturing, product inspection and quality control, warehousing in China, project development, marketing and field research, logo design, China visit assistance, certificates and licenses, and customs clearance.','هل يجب أن يكون لدي مورد في الصين؟':'Do I need to have a supplier in China?','ليس بالضرورة. شاركنا نوع المنتج أو فكرة مشروعك، ونناقش معك خدمات البحث والتوريد المناسبة. وإذا كان لديك مورد بالفعل، يمكننا بحث الخدمات المساندة التي تحتاجها.':'Not necessarily. Tell us about your product or project idea and we can discuss suitable sourcing support. If you already have a supplier, we can explore the additional services you need.','كيف أطلب عرض سعر؟':'How do I request a quote?','استخدم نموذج طلب السعر أو مساعد الخدمات، وأرسل نوع المنتج أو المشروع والكمية التقريبية وموقع التسليم إن توفرت. سنراجع التفاصيل معك لتحديد نطاق الخدمة والتكلفة المناسبة.':'Use the quote form or service finder and share the product or project type, approximate quantity, and delivery location if available. We’ll review the details with you to define the scope and relevant costs.','كم تستغرق عملية الشحن؟':'How long does shipping take?','تختلف المدة بحسب نوع الشحنة وطريقة النقل وإجراءات المنافذ والتخليص. نوضح التقدير المتاح ضمن عرض الخدمة بعد مراجعة تفاصيل الشحنة، وقد يتغير بحسب الظروف والإجراءات.':'Timing varies by shipment type, transport method, port procedures, and customs clearance. We provide an estimate after reviewing the shipment details; timing may change with conditions and procedures.','هل تشمل خدماتكم فحص المنتجات قبل الشحن؟':'Do you offer product inspections before shipping?','نعم، تتوفر خدمة فحص المنتجات ومتابعة الجودة في الصين. نحدد معك نطاق الفحص والمواصفات المطلوبة قبل ترتيب الخدمة.':'Yes. Product inspection and quality follow-up are available in China. We’ll agree on the inspection scope and specifications before arranging the service.','هل تكلفة الشحن والتخليص ثابتة؟':'Are shipping and clearance costs fixed?','لا، تختلف التكلفة بحسب المنتج والوزن أو الحجم وطريقة الشحن ومتطلبات التخليص والرسوم ذات الصلة. لذلك نصدر عرضاً بناءً على معلومات الشحنة، وتُراجع أي متغيرات قبل اعتماد الطلب.':'No. Costs vary by product, weight or volume, shipping method, clearance requirements, and related fees. We prepare a quote using the shipment information and review any changes before the order is confirmed.','هل أستطيع طلب خدمة واحدة فقط؟':'Can I request just one service?','نعم، يمكنك طلب خدمة محددة أو أكثر من خدمة ضمن مشروع واحد. نرتب معك الخدمات المطلوبة بحسب احتياجك.':'Yes. You can request a single service or combine multiple services in one project. We’ll coordinate the services based on your needs.','هل تساعدون في متطلبات الشهادات والتراخيص؟':'Can you help with certificates and licenses?','نقدم المساعدة في متابعة متطلبات الشهادات والتراخيص ذات الصلة. تختلف المتطلبات بحسب نوع المنتج والجهة المختصة، لذا نراجعها معك قبل بدء الإجراءات.':'We can help follow up on relevant certificate and license requirements. Requirements vary by product and authority, so we review them with you before starting.',
  'بعد إرسال الطلب':'After your request','خطوتك التالية':'Your next step','تصير أوضح.':'is clearer.','نوضح لك كيف تبدأ المتابعة بعد تواصلك معنا، من مراجعة الفكرة إلى ترتيب الخطوة العملية.':'Here is how follow-up begins, from reviewing your idea to arranging the next practical step.','ابدأ طلبك':'Start your request','نراجع التفاصيل':'We review the details','نطّلع على نوع المنتج أو المشروع والخدمات التي حددتها.':'We review your product or project and the services you selected.','نتواصل لتوضيح المطلوب':'We clarify what is needed','إذا احتجنا معلومات إضافية، نناقشها معك عبر واتساب أو وسيلة التواصل المتاحة.':'If we need more information, we’ll discuss it with you on WhatsApp or another available contact method.','نحدد نطاق الخدمة':'We define the service scope','نتفق على ما يشمله الطلب والخطوات والتكاليف قبل اعتماد العمل.':'We agree on what the request includes, the steps, and costs before work is approved.','نشاركك التحديثات':'We share updates','تُنسق مستجدات الطلب أو الشحنة مع الفريق مباشرة عبر قناة التواصل المتفق عليها.':'Updates about your request or shipment are coordinated directly with the team through the agreed contact channel.','ملاحظة':'Note','هذا الموقع لا يعرض تتبعاً مباشراً للشحنات أو حالة الطلب آلياً حالياً.':'This website does not currently show live shipment tracking or automated request status.',
  'لنبدأ':'Let’s get started','عندك فكرة أو':'Have an idea or','طلب توريد؟':'sourcing request?','أرسل لنا التفاصيل، وفريقنا يتواصل معك لمناقشة الخطوة المناسبة.':'Share the details and our team will contact you to discuss the right next step.','الرياض، المملكة العربية السعودية':'Riyadh, Saudi Arabia','لتجهيز طلبك، اذكر إن أمكن:':'To help us prepare your request, include if available:','نوع المنتج ومواصفاته أو صورته':'Product type, specifications, or a photo','الكمية التقريبية':'Approximate quantity','هل لديك مورد في الصين؟':'Do you have a supplier in China?','الخدمات التي تحتاجها ومدينة التسليم':'Services needed and delivery city','ما عندك كل التفاصيل؟ ابدأ بما تعرفه، ونساعدك في تحديد الباقي.':'Missing some details? Start with what you know and we’ll help identify the rest.','طلب عرض سعر':'Request a quote','املأ التفاصيل وسنعاود التواصل معك':'Share a few details and we’ll follow up','الاسم':'Name','رقم التواصل':'Contact number','الخدمة المطلوبة':'Service needed','اختر الخدمة':'Choose a service','نبذة عن طلبك':'Tell us about your request','إرسال الطلب عبر واتساب':'Send request on WhatsApp','سيتم فتح واتساب لإرسال رسالتك بعد الضغط على الزر.':'WhatsApp will open with your message when you press the button.','نربط الفرص بين الصين والسعودية.':'Connecting opportunities between China and Saudi Arabia.','شريكك التجاري من الفكرة إلى التنفيذ.':'Your business partner from idea to execution.','ابدأ طلبك من النموذج':'Start your request using the form','جميع الحقوق محفوظة.':'All rights reserved.','العودة للأعلى':'Back to top','تواصل معنا':'Contact us',
  'PowerCore Solutions - الرئيسية':'PowerCore Solutions - Home','فتح القائمة':'Open menu','إغلاق القائمة':'Close menu','اطلب الاستيراد والتصدير':'Request import and export','اطلب خدمة التصنيع':'Request manufacturing','اطلب فحص المنتجات':'Request product inspection','اطلب التخزين في الصين':'Request warehousing in China','اطلب تطوير المشاريع':'Request project development','اطلب التسويق والمسح الميداني':'Request field research','اطلب تصميم شعار':'Request a logo design','اطلب تسهيلات زيارة الصين':'Request China visit assistance','اطلب خدمة الشهادات والتراخيص':'Request certificates and licenses','اطلب خدمة التخليص الجمركي':'Request customs clearance','عبوة فيلم حماية الطلاء PPF من علامة DR.CAR':'DR.CAR paint protection film packaging','عبوة فيلم تظليل نوافذ السيارات من علامة DR.CAR':'DR.CAR automotive window tint packaging','Your project journey':'Your project journey',
  'اسمك الكريم':'Your name','نوع المنتج أو فكرة المشروع والكمية التقريبية إن وجدت':'Product or project idea, and approximate quantity if known','PowerCore Solutions. جميع الحقوق محفوظة.':'PowerCore Solutions. All rights reserved.','أكثر من خدمة':'Multiple services','العودة للأعلى ↑':'Back to top ↑','طريقة العمل':'How it works','اختر احتياجك':'Choose a need','القائمة الرئيسية':'Main navigation','تواصل مع PowerCore Solutions عبر واتساب':'Contact PowerCore Solutions on WhatsApp','رحلة تجارية تربط الصين بالسعودية':'A business journey connecting China and Saudi Arabia',
  'شركة سعودية مقرها الرياض، تساعد الأفراد والمنشآت على تنفيذ أعمالهم في الصين':'A Saudi company based in Riyadh, helping individuals and businesses carry out projects in China'
};
Object.assign(textEn,{'حمّل دليل الاستيراد':'Download the import guide','نسخة عملية مختصرة تساعدك على تجهيز بيانات المنتج والمورد والشحنة.':'A practical short guide to help you prepare product, supplier, and shipment details.','الدليل بالعربية':'Arabic guide','English guide':'English guide','اقرأ المقالات العملية':'Read practical articles','المقالات العملية':'Practical articles'});
const serviceNamesEn={'الاستيراد والتصدير':'Import and export','التصنيع':'Manufacturing','الشهادات والتراخيص':'Certificates and licenses','الشحن والتخليص الجمركي':'Shipping and customs clearance','التخليص الجمركي':'Customs clearance','التخزين في الصين':'Warehousing in China','تطوير المشاريع':'Project development','التسويق والمسح الميداني':'Marketing and field research','تسهيلات زيارة الصين':'China visit assistance','تصميم الشعارات':'Logo design','فحص المنتجات ومراقبة الجودة':'Product inspection and quality control'};
const goalNamesEn={source:'I’m looking for a product or supplier',make:'I want to manufacture a product',ship:'I have goods to prepare for shipping',grow:'I’m developing a project or visiting China',brand:'I’m launching a brand or preparing a product for market'};
function localizedService(name){return window.siteLocale==='en'?(serviceNamesEn[name]||name):name}
const languageToggle=document.getElementById('language-toggle');
const savedLocale=(()=>{try{return localStorage.getItem('powercore-locale')||'ar'}catch{return'ar'}})();
const requestedProduct=new URLSearchParams(window.location.search).get('product');
const productRequestNotes={ppf:{ar:'المقاس أو المواصفات المطلوبة: ',en:'Requested size or specifications: '},tint:{ar:'درجة التظليل أو المواصفات المطلوبة: ',en:'Requested tint shade or specifications: '}};
const textNodes=[];
const textWalker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(textWalker.nextNode())if(!textWalker.currentNode.parentElement.closest('#language-toggle'))textNodes.push({node:textWalker.currentNode,original:textWalker.currentNode.nodeValue});
const translatedAttributes=[];
document.querySelectorAll('[aria-label],[placeholder],[alt]').forEach(element=>['aria-label','placeholder','alt'].forEach(attribute=>{if(element.hasAttribute(attribute)&&element!==languageToggle)translatedAttributes.push({element,attribute,original:element.getAttribute(attribute)})}));
function applySiteLanguage(locale){
  window.siteLocale=locale;
  const isEnglish=locale==='en';
  document.documentElement.lang=isEnglish?'en':'ar';
  document.documentElement.dir=isEnglish?'ltr':'rtl';
  const pageTitle=isEnglish?'PowerCore Solutions | Your China–Saudi Business Partner':'PowerCore Solutions | شريكك التجاري بين الصين والسعودية';
  const pageDescription=isEnglish?'PowerCore Solutions is your Saudi partner for sourcing, manufacturing, quality inspection, shipping, and trade support with China.':'PowerCore Solutions شريكك في الاستيراد والتجارة بين الصين والسعودية: من اختيار المورد والتصنيع إلى الفحص والشحن والتخليص الجمركي.';
  const socialDescription=isEnglish?'Sourcing, manufacturing, inspection, and shipping services between China and Saudi Arabia.':'خدمات متكاملة للتوريد والتصنيع والفحص والشحن بين الصين والسعودية.';
  document.title=pageTitle;
  document.querySelector('meta[name="description"]').content=pageDescription;
  document.querySelector('meta[property="og:title"]').content=pageTitle;
  document.querySelector('meta[property="og:description"]').content=socialDescription;
  document.querySelector('meta[property="og:locale"]').content=isEnglish?'en_US':'ar_SA';
  document.querySelector('meta[property="og:image:alt"]').content=isEnglish?'PowerCore Solutions — your business partner between China and Saudi Arabia':'PowerCore Solutions — شريكك التجاري بين الصين والسعودية';
  document.querySelector('meta[name="twitter:title"]').content=pageTitle;
  document.querySelector('meta[name="twitter:description"]').content=socialDescription;
  for(const {node,original} of textNodes){const trimmed=original.trim();if(!trimmed)continue;const leading=original.match(/^\s*/)?.[0]||'';const trailing=original.match(/\s*$/)?.[0]||'';node.nodeValue=leading+(isEnglish?(textEn[trimmed]||trimmed):trimmed)+trailing}
  for(const {element,attribute,original} of translatedAttributes)element.setAttribute(attribute,isEnglish?(textEn[original]||original):original);
  const productNote=productRequestNotes[requestedProduct];
  const notesField=document.querySelector('#request-builder-form [name="notes"]');
  if(productNote&&notesField&&(notesField.value===productNote.ar||notesField.value===productNote.en))notesField.value=productNote[locale];
  languageToggle.textContent=isEnglish?'العربية':'English';
  languageToggle.setAttribute('aria-label',isEnglish?'تغيير لغة الموقع إلى العربية':'Switch language to English');
  languageToggle.setAttribute('aria-pressed',String(isEnglish));
  const floatingWhatsapp=document.querySelector('.floating-whatsapp');
  const floatingMessage=isEnglish?'Hello, I would like to learn more about PowerCore Solutions services.':'السلام عليكم، أرغب بالاستفسار عن خدمات PowerCore Solutions.';
  floatingWhatsapp.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(floatingMessage)}`;
  menuToggle.setAttribute('aria-label',isEnglish?(mainNav.classList.contains('open')?'Close menu':'Open menu'):(mainNav.classList.contains('open')?'إغلاق القائمة':'فتح القائمة'));
  document.getElementById('form-hint').textContent=isEnglish?'WhatsApp will open with your message when you press the button.':'سيتم فتح واتساب لإرسال رسالتك بعد الضغط على الزر.';
  if(typeof selectedGoal!=='undefined'){
    document.querySelector('.assistant-count').textContent=selectedGoal?(isEnglish?'Need selected':'تم اختيار احتياجك'):(isEnglish?'Choose an option':'اختر خياراً');
    if(selectedGoal)updateRecommendations();
  }
  updateShippingAdvice();
  try{localStorage.setItem('powercore-locale',locale)}catch{}
}
languageToggle.addEventListener('click',()=>applySiteLanguage(window.siteLocale==='en'?'ar':'en'));
Object.assign(textEn,{'لإرسال صور المنتج أو ملف المواصفات، أرفقهما يدوياً من داخل محادثة واتساب بعد فتح الرسالة.':'To send product photos or a specification file, attach them manually in the WhatsApp conversation after the message opens.'});
Object.assign(textEn,{'خدمات مساندة (اختياري)':'Supporting services (optional)','الاستيراد والتصدير':'Import and export','التصنيع':'Manufacturing','فحص المنتجات ومراقبة الجودة':'Product inspection and quality control','التخزين في الصين':'Warehousing in China','تطوير المشاريع':'Project development','التسويق والمسح الميداني':'Marketing and field research','تصميم الشعارات':'Logo design','تسهيلات زيارة الصين':'China visit assistance','الشهادات والتراخيص':'Certificates and licenses','التخليص الجمركي':'Customs clearance'});
applySiteLanguage(savedLocale);
if(productRequestNotes[requestedProduct]){
  const requestForm=document.getElementById('request-builder-form');
  requestForm.elements.kind.value='ready';
  requestForm.elements.product.value=requestedProduct;
  requestForm.elements.notes.value=productRequestNotes[requestedProduct][savedLocale==='en'?'en':'ar'];
}
