import React from 'react'
import 'keen-slider/keen-slider.min.css'
import '../CSS/rewardCarousel.css' 
import RewardCard from './RewardCard'
import { useKeenSlider } from 'keen-slider/react' 
import { useEffect, useState} from 'react';
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const RewardCarousel = ({id}) => {
    const [rewardList, setRewardList] = useState([]);
    const [carouselKey, setCarouselKey] = useState(0);

    useEffect(() => {
        const fetchRewards = async() => {
              try{
                const res = await axios.get(`${API_URL}/api/rewards/${id}`)
                setRewardList(res?.data)
                console.log(rewardList[0])
            } catch(e) {
                console.error("Could't get rewards")
            }
        }
        if (id) fetchRewards()
    }, [id])

    useEffect(() => {
        if (rewardList.length > 0) {
          setCarouselKey(prev => prev + 1); 
        }
      }, [rewardList]);

   
    const carousel = (slider) => {
        const z = 300
        function rotate() {
          const deg = 360 * slider.track.details.progress
          slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
        }
        slider.on("created", () => {
          const deg = 360 / slider.slides.length
          slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
          })
          rotate()
        })
        slider.on("detailsChanged", rotate)
      }

    const [sliderRef] = useKeenSlider(
        {
          loop: true,
          selector: ".carousel__cell",
          renderMode: "custom",
          mode: "free-snap",
        },
        [carousel]
      )
    
      return (
        <>
        {rewardList.length > 0 ? (
            <div className="wrapper">
              <div className="scene">
                <div className="carousel keen-slider" ref={sliderRef} key={carouselKey}>
                  {rewardList
                    .filter(r => r?.img)
                    .slice(0, 6)
                    .map((reward, index) => (
                      <div key={reward.id} className={`carousel__cell number-slide${index + 1}`}>
                        <RewardCard
                          rewardId={reward.id}
                          rewardImg={reward.img}
                          rewardTitle={reward.title}
                          rewardPrice={reward.cost}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading rewards...</p>
          )}
     </>   
 )
}

export default RewardCarousel;