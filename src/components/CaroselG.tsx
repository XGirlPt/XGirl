"use client";
/* eslint-disable @next/next/no-img-element */
import React, { Component, createRef } from "react";
import Slider from "react-slick";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlurImage } from "./BlurImage";

interface Profile {
  nome: string;
  photos: string[];
  cidade: string;
}

interface CarouselGProps {
  profiles: Profile[];
}

interface CarouselGState {
  slidesToShow: number;
}

class CarouselG extends Component<CarouselGProps, CarouselGState> {
  private sliderRef = createRef<Slider>();

  constructor(props: CarouselGProps) {
    super(props);
    this.state = {
      slidesToShow: 9, // Valor inicial para telas grandes
    };
  }

  componentDidMount() {
    this.adjustSlidesToShow();
    window.addEventListener("resize", this.adjustSlidesToShow);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.adjustSlidesToShow);
  }

  adjustSlidesToShow = () => {
    const mqLarge = window.matchMedia(
      "(min-width: 1440px) and (min-resolution: 2dppx)"
    );
    const mqMedium = window.matchMedia(
      "(min-width: 1024px) and (min-resolution: 2dppx)"
    );
    if (mqLarge.matches) {
      this.setState({ slidesToShow: 7 });
    } else if (mqMedium.matches) {
      this.setState({ slidesToShow: 7 }); // Ajuste para MacBooks de 13'' e similares
    } else {
      this.setState({ slidesToShow: 9 });
    }
  };

  handleClick = (direction: "next" | "prev") => {
    if (this.sliderRef.current) {
      direction === "next"
        ? this.sliderRef.current.slickNext()
        : this.sliderRef.current.slickPrev();
    }
  };

  render() {
    const { profiles } = this.props;
    const { slidesToShow } = this.state;

    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: slidesToShow,
      slidesToScroll: 3,
      vertical: false,
      responsive: [
        {
          breakpoint: 768, // Configurações para dispositivos com tela até 768 pixels
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    };

    return (
      <div className="relative w-full">
        <Slider ref={this.sliderRef} {...settings}>
          {profiles.map((profile, index) => (
            <div key={index} className="px-2">
              <div className="relative">
                <Link href={`/girls/${profile.nome}`}>
                  <BlurImage
                    src={profile.photos[0]}
                    alt={profile.nome}
                    className="w-full h-52 md:h-72 object-cover transition duration-300 ease-in-out transform hover:scale-105 bg-pink-200 hover:bg-pink-800 hover:opacity-50 rounded-xl blur-2xl"
                  />
                </Link>
                <p className="absolute bottom-6 left-0 right-0 text-white text-center py-2">
                  {profile.nome}{" "}
                  <VscVerifiedFilled className="text-green-400 inline-block" />
                </p>
                <p className="absolute bottom-0 left-0 right-0 text-white text-center py-2">
                  {profile.cidade}{" "}
                  <FaMapMarkerAlt className="text-rose-800 inline-block" />
                </p>
              </div>
            </div>
          ))}
        </Slider>
        <button
          onClick={() => this.handleClick("prev")}
          className="bg-gray-700 bg-opacity-50 hover:bg-rose-800 text-white font-semibold hover:text-white py-2 px-4 rounded-full absolute top-1/2 transform -translate-y-1/2 left-4"
        >
          &lt;
        </button>
        <button
          onClick={() => this.handleClick("next")}
          className="bg-gray-700 bg-opacity-50 hover:bg-rose-800 text-white font-semibold hover:text-white py-2 px-4 rounded-full absolute top-1/2 transform -translate-y-1/2 right-4"
        >
          &gt;
        </button>
      </div>
    );
  }
}

export default CarouselG;