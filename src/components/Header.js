import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Adicione esta importação
import Slider from "react-slick";
import { faChevronRight, faChevronLeft, faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slidedata = [
  {
    id: 3,
    img: "/images/mariafumaca-banner.jpg",
    titulo: "Trem Maria Fumaça",
    subtitulo: "Embarque na Magia",
    descricao: "Viva um passeio inesquecível.",
    destaque: "Veja os Pacotes",
    link: "/passeios"
  }
];

export default function Header() {
  const sliderRef = useRef(null);
  const navigate = useNavigate(); // Hook para navegação

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  // Função para navegar para a página correta
  const handleExploreClick = (link) => {
    navigate(link);
  };

  const configuracaoSlide = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    arrows: false,
    pauseOnHover: true,
    fade: true
  };

  return (
    <header>
      <div className="header-container">
        <Slider ref={sliderRef} {...configuracaoSlide}>
          {Slidedata.map((slide) => (
            <div key={slide.id} className="slide-item">
              <div className="slide-image">
                <img src={slide.img} alt={slide.titulo} loading="lazy" />
                <div className="image-overlay"></div>
              </div>

              <div className="slide-content">
                <div className="content-wrapper">
                  {slide.destaque && (
                    <div className="destaque-badge">
                      {slide.destaque}
                    </div>
                  )}

                  <h2 className="slide-subtitle">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{slide.subtitulo}</span>
                  </h2>

                  <h1 className="slide-title">{slide.titulo}</h1>

                  <p className="slide-description">{slide.descricao}</p>

                  <div className="rating">
                    <div className="stars">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <span>4.9 (1.2k avaliações)</span>
                    </div>
                  </div>

                  <button
                    className="cta-button"
                    onClick={() => handleExploreClick(slide.link)}
                  >
                    Explorar Agora
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <button className="slider-btn prev" onClick={prevSlide} aria-label="Slide anterior">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="slider-btn next" onClick={nextSlide} aria-label="Próximo slide">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </header>
  );
}
