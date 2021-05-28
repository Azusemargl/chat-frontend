import tinycolor from 'tinycolor2'

const getCorrectIndex = (number: number) => number > 255 ? 255 : number < 1 ? 1 : number

export default (hash: number)  => {
   const [r, g, b] = hash.toString().substr(2, 5).split("").map(char => getCorrectIndex(char.charCodeAt(0)))
   
   return {
      color: tinycolor({ r, g, b }).lighten(10).saturate(10).toHexString(),
      colorLighten: tinycolor({ r, g, b }).lighten(30).saturate(30).toHexString()
   }
}
