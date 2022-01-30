import React from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    return (
        <div classNameName={styles.container} dir="rtl">
           <div className={styles.background}>
	<div className={styles.ground}></div>
</div>
<div className={styles.container}>
	<div className={styles.left_section}>
		<div className={styles.inner_content}>
			<h1 className={styles.heading}>404</h1>
			<p className={styles.subheading}>Looks like the page you were looking for is no longer here.</p>
		</div>
	</div>
	<div className={styles.right_section}>
		<svg className={styles.svgimg} xmlns="http://www.w3.org/2000/svg" viewBox="51.5 -15.288 385 505.565">
        <g className={styles.bench_legs}>
          <path d="M202.778,391.666h11.111v98.611h-11.111V391.666z M370.833,390.277h11.111v100h-11.111V390.277z M183.333,456.944h11.111
          v33.333h-11.111V456.944z M393.056,456.944h11.111v33.333h-11.111V456.944z" />
        </g>
        <g className={styles.top_bench}>
          <path d="M396.527,397.917c0,1.534-1.243,2.777-2.777,2.777H190.972c-1.534,0-2.778-1.243-2.778-2.777v-8.333
          c0-1.535,1.244-2.778,2.778-2.778H393.75c1.534,0,2.777,1.243,2.777,2.778V397.917z M400.694,414.583
          c0,1.534-1.243,2.778-2.777,2.778H188.194c-1.534,0-2.778-1.244-2.778-2.778v-8.333c0-1.534,1.244-2.777,2.778-2.777h209.723
          c1.534,0,2.777,1.243,2.777,2.777V414.583z M403.473,431.25c0,1.534-1.244,2.777-2.778,2.777H184.028
          c-1.534,0-2.778-1.243-2.778-2.777v-8.333c0-1.534,1.244-2.778,2.778-2.778h216.667c1.534,0,2.778,1.244,2.778,2.778V431.25z"
          />
        </g>
        <g className={styles.bottom_bench}>
          <path d="M417.361,459.027c0,0.769-1.244,1.39-2.778,1.39H170.139c-1.533,0-2.777-0.621-2.777-1.39v-4.86
          c0-0.769,1.244-0.694,2.777-0.694h244.444c1.534,0,2.778-0.074,2.778,0.694V459.027z" />
          <path d="M185.417,443.75H400c0,0,18.143,9.721,17.361,10.417l-250-0.696C167.303,451.65,185.417,443.75,185.417,443.75z" />
        </g>
        <g id="lamp">
          <path className={styles.lamp_details} d="M125.694,421.997c0,1.257-0.73,3.697-1.633,3.697H113.44c-0.903,0-1.633-2.44-1.633-3.697V84.917
          c0-1.257,0.73-2.278,1.633-2.278h10.621c0.903,0,1.633,1.02,1.633,2.278V421.997z"
          />
          <path className={styles.lamp_accent} d="M128.472,93.75c0,1.534-1.244,2.778-2.778,2.778h-13.889c-1.534,0-2.778-1.244-2.778-2.778V79.861
          c0-1.534,1.244-2.778,2.778-2.778h13.889c1.534,0,2.778,1.244,2.778,2.778V93.75z" />
          
          <circle className={styles.lamp_light} cx="119.676" cy="44.22" r="40.51" />
          <path className={styles.lamp_details} d="M149.306,71.528c0,3.242-13.37,13.889-29.861,13.889S89.583,75.232,89.583,71.528c0-4.166,13.369-13.889,29.861-13.889
          S149.306,67.362,149.306,71.528z"/>
          <radialGradient className={styles.light_gradient} id="SVGID_1_" cx="119.676" cy="44.22" r="65" gradientUnits="userSpaceOnUse">
            <stop  offset="0%" style="stop-color:#FFFFFF; stop-opacity: 1"/>
            <stop  offset="50%" style="stop-color:#EDEDED; stop-opacity: 0.5">
              <animate attributeName={styles.stop_opacity} values="0.0; 0.5; 0.0" dur="5000ms" repeatCount="indefinite"></animate>
            </stop>
            <stop  offset="100%" style="stop-color:#EDEDED; stop-opacity: 0"/>
          </radialGradient>
          <circle className={styles.lamp-light__glow" fill="url(#SVGID_1_)" cx="119.676" cy="44.22" r="65"/>
          <path className={styles.lamp-bottom" d="M135.417,487.781c0,1.378-1.244,2.496-2.778,2.496H106.25c-1.534,0-2.778-1.118-2.778-2.496v-74.869
          c0-1.378,1.244-2.495,2.778-2.495h26.389c1.534,0,2.778,1.117,2.778,2.495V487.781z" />
        </g>
      </svg>
	</div>
</div>
        </div>
    )
}

export default Navbar
