import Styles from "../page.module.css"


const Inicio = () => {
    return (
<div >
  <div className={Styles.div1}>
      <main className={Styles.mainBanner}>
    <div className={Styles.imageContainer}>
      <img src="https://static.wixstatic.com/media/9fbf96_0fbf26014a794c87b00f0ad557394ad1~mv2.png/v1/fill/w_382,h_382,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo-red-bamboo-17-0120.png" alt="Red Bamboo - Vegan Comfort Food"/>
    </div>
  </main>
</div>


<div className={Styles.menu}>
    <div className={Styles.menuItem}>
        <img src="https://static.wixstatic.com/media/9fbf96_fb749e79a4b74d0d897ca41ea4aa556c~mv2.jpg/v1/fill/w_212,h_212,fp_0.51_0.51,q_90/9fbf96_fb749e79a4b74d0d897ca41ea4aa556c~mv2.webp" alt="Food Item 1"/>
    </div>
    <div className={Styles.menuItem}>
        <img src="https://static.wixstatic.com/media/9fbf96_6383d8b9984b43558b9c4466651db42c~mv2.jpg/v1/fill/w_212,h_212,fp_0.5_0.5,q_90/9fbf96_6383d8b9984b43558b9c4466651db42c~mv2.webp" alt="Food Item 2"/>
    </div>
    <div className={Styles.menuItem}>
        <img src="https://static.wixstatic.com/media/9fbf96_7a17835d32ca49b78cb6a2b78b30cfdf~mv2.jpg/v1/fill/w_212,h_212,fp_0.52_0.52,q_90/9fbf96_7a17835d32ca49b78cb6a2b78b30cfdf~mv2.webp" alt="Food Item 3"/>
    </div>
    <div className={Styles.menuItem}>
        <img src="https://static.wixstatic.com/media/9fbf96_1b8298e441a34e49a9212727778d570e~mv2_d_2880_2729_s_4_2.jpg/v1/fill/w_212,h_212,q_90/9fbf96_1b8298e441a34e49a9212727778d570e~mv2_d_2880_2729_s_4_2.webp" alt="Food Item 4"/>
    </div>
</div>
<div className={Styles.Buttonn}>
<a className={Styles.Button2} >ENCOMENDE AGORA</a>
</div>
        <div className={Styles.cardContainer}>

    <div className={Styles.card}>
      <img src="https://static.wixstatic.com/media/9fbf96_34ee6e61ece0455599330b3958ea949c~mv2.jpg/v1/fill/w_980,h_1276,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9fbf96_34ee6e61ece0455599330b3958ea949c~mv2.jpg"  alt="Imagem do Restaurante" className={Styles.cardImage}/>
      <div className={Styles.cardContent}>
        <div className={Styles.orderContainer} >
        <h1>ORDER</h1>
        <h2>pick-up & delivery</h2>

        <div className={Styles.takeout}>
        <h3>CONTACTLESS TAKE-OUT</h3>
        <p>To place an order for pickup, please order via Square.</p>
        <a href="" className={Styles.cardButton}>ABOUT US</a>        </div>
        <div className={Styles.delivery}>
        <h3>DELIVERY EXPANDED</h3>

        <p>To place an order for delivery, please choose from one of our partners below:</p>
        
        <div className={Styles.deliveryLinks}>
        <a href="#">Postmates</a>, 
            <a href="#">GrubHub</a>, 
            <a href="#">Seamless</a> & 
            <a href="#">UberEats</a>
        </div>
        </div>
      </div>
    </div>
</div>

    <div className={Styles.card2}>
      <img src="https://static.wixstatic.com/media/e1e470_451463f133604d8a8027bf3c10cdd345~mv2_d_3264_2448_s_4_2.jpg/v1/fill/w_980,h_676,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/e1e470_451463f133604d8a8027bf3c10cdd345~mv2_d_3264_2448_s_4_2.jpg" alt="Imagem do Restaurante" className={Styles.cardImage}/>
      <div className={Styles.cardContent2}>
        <h2 className={Styles.cardTitle}>ABOUT</h2>
        <p className={Styles.cardSubtitle}>our restaurant</p>
        <div className={Styles.cardSeparator}></div>
        <div className={Styles.cardHours}>
          <p>Monday - <span className={Styles.highlight}>12pm-9pm</span></p>
          <p>Tuesday - <span className={Styles.highlight}>12pm-9pm</span></p>
          <p>Wednesday - <span className={Styles.highlight}>12pm-10pm</span></p>
          <p>Thursday - <span className={Styles.highlight}>12pm-10pm</span></p>
          <p>Friday - <span className={Styles.highlight}>12pm-10pm</span></p>
          <p>Saturday - <span className={Styles.highlight}>12pm-10pm</span></p>
          <p>Sunday - <span className={Styles.highlight}>12pm-10pm</span></p>
        </div>
        <div className={Styles.cardContact}>
          <p>PHONE</p>
          <p>212.260.1212</p>
          <p>212.260.7049</p>
        </div>
        <a href="#" className={Styles.cardButton}>ABOUT US</a>
      </div>
    </div>
  </div>
  <div className={Styles.header}>
    <div className={Styles.overlay}>
        <h2>ECLECTIC VEGAN CUISINE</h2>
        <h1>SOY DELICIOUS</h1>
    </div>
</div>
</div>
    )
}

export default Inicio