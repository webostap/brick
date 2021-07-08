//import
window.addEventListener('scroll', e=>{
//    console.log(sec1.offsetTop)
    let val = window.scrollY - sec1.offsetTop + window.innerHeight - sec1.clientHeight + 150;
//    let val = window.scrollY - sec1.offsetTop// + sec1.clientHeight;
    val*=val>0
    sec1.style.setProperty('--scroll-y', val/5 + "px");
})



document.querySelectorAll('.js-numbers').forEach(el=>{
    const inp = el.querySelector('input[type="number"]')

    const minus = document.createElement('div')
    minus.className = 'nc-minus'
    minus.onclick = ()=> inp.stepUp(-5)
    el.append(minus)

    const plus = document.createElement('div')
    plus.className = 'nc-plus'
    plus.onclick = ()=> inp.stepUp(5)
    el.append(plus)

})

const visibleToggler = new IntersectionObserver( entries => {
	if(entries[0].isIntersecting === true) {
        entries[0].target.classList.add('visible')
    } else {
        entries[0].target.classList.remove('visible')
    }
}, { threshold: [0] })
document.querySelectorAll(".animated-childs").forEach(el=>{
    visibleToggler.observe(el)
})




function modal_rendering(openFu, closeFu) {
    const open_canv_btn = document.getElementById('open_canv')
    const canv_modal = document.getElementById('canv_modal')
    const canv = document.getElementById('canv')

    function open_canv() {
        canv_modal.classList.add('open')
        openFu()
    }
    function close_canv() {
        canv_modal.classList.remove('open')
        closeFu()
    }

    open_canv_btn.classList.remove('disabled')
    open_canv_btn.onclick = open_canv

    document.addEventListener('keydown', e=>{
        if(e.key === "Escape") close_canv()
    })
    document.getElementById('canv_close').onclick = close_canv
    close_canv()
}




window.addEventListener('load', e=>{
    if (document.getElementById( 'canv' ))
        import('../models/brick.js?v2')
            .then(rdr => {
                rdr.place(document.getElementById('front_canv'))
//                modal_rendering(rdr.enable,rdr.disable)
            }).catch(err => {})
    if (document.getElementById( 'canv2' ))
        import('../models/brick1.js?v2')
            .then(rdr => {
                rdr.place(document.getElementById('canv2'))
//                modal_rendering(rdr.enable,rdr.disable)
            }).catch(err => {})
})




































window.addEventListener('click', ev=>{
//    alert('hello')
//    canv.scrollIntoView();
    /*window.scroll({
      top: 100,
      behavior: 'smooth'
    });*/
})

/*new IntersectionObserver(entries=> {
	if(entries[0].isIntersecting === true) {
//         window.scroll(0,entries[0].target.offsetTop);
//        entries[0].target.scrollIntoView();
//		console.log(entries[0].target);
    }
}, { threshold: [0] }).observe(document.querySelector("#canv"));*/



//const brick_landing = document.querySelector( '.brick-layout.js-sticky' )
//const brick_sticky = brick_landing.querySelector( '.brick-layout__left' )
//function sticky_photo() {
//    let bcr = brick_landing.getBoundingClientRect();
//    (bcr.top + bcr.height - window.innerHeight < 0) ?
//        brick_sticky.classList.add('static') :
//        brick_sticky.classList.remove('static')
//}
//window.addEventListener('scroll', sticky_photo)
//window.addEventListener('resize', sticky_photo)

