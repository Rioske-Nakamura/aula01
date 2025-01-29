/**footer */
import Styles from "../page.module.css"
const Footer = () => {

    return(
        <footer className={Styles.footer}>
    <div className={Styles.address}>140 WEST 4TH STREET | NY, NY 10012</div>
    <div className={Styles.phone}>212.260.1212 | 212.260.7049</div>

    <div className={Styles.links2}>
        <a href="#">LAR</a>
        <a href="#">ORDEM</a>
        <a href="#">CARDÁPIOS</a>
        <a href="#">CARTÕES-PRESENTE</a>
        <a href="#">SOBRE</a>
        <a href="#">CONTATO</a>
        <a href="#">IMPRESSA</a>
    </div>

    <div className={Styles.icons2}>
        <a href="#"></a>
        <a href="#"></a>
        <a href="#"></a>
    </div>

    <div className={Styles.award}>
        <img src="https://static.wixstatic.com/media/9fbf96_35b8769b32834e2cb4819d9bc5bb5335~mv2.png/v1/fill/w_84,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Round_Badge_Finalist.png" alt="Wix Stunning Awards Finalist"/>
    </div>

    <div className={Styles.credits}>
        &copy; 2022 Red Bamboo - Todos os direitos reservados<br/>
        Design de Web e Menu por Mark DeGallo
    </div>
</footer>
    )
}

export default Footer