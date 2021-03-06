import WSData from "./ws_data";
import Vector from "../modelComponents/vector";

export default class WSConverter {
   
   constructor(private data: WSData) { 
      
   }

   public toReal(display: Vector): Vector { 
      return display.sub(this.data.wsSize.div(2))
         .diScale(this.data.zoom.get())
         .add(this.data.camera.get());
   }

   public toDisplay(real: Vector): Vector { 
      return real.sub(this.data.camera.get())
         .scale(this.data.zoom.get())
         .add(this.data.wsSize.div(2));
   }
}