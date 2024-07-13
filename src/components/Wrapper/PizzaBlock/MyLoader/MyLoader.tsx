import React from "react"
import ContentLoader from "react-content-loader"
import style from '../Pizza/Pizza.module.css'
const MyLoader: React.FC = (props) => {
  return (
    <ContentLoader
      className={style.pizzaBlock}
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="140" cy="140" r="140" />
      <rect x="0" y="288" rx="12" ry="12" width="280" height="24" />
      <rect x="0" y="319" rx="11" ry="11" width="280" height="84" />
      <rect x="0" y="421" rx="10" ry="10" width="88" height="27" />
      <rect x="126" y="411" rx="10" ry="10" width="151" height="44" />
    </ContentLoader>
  )
}

export default MyLoader