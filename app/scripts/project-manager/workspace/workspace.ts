import Component from "../../framework/component";
import WSRender from "./ws_render";

export default class Workspace extends Component {
   private playing: boolean = false;
   private animateFrameId: number = 0;

   private render: WSRender = new WSRender();

   constructor() { 
      super();
   }

   public init(root: Element) { 
      this.getElements(root);
      this.initEvents();
      this.initRender();
   }

   public start(): void { 
      if (this.playing) return;
      this.playing = true;

      this.trigger('start');

      let workspace: Workspace = this;

      cancelAnimationFrame(this.animateFrameId);
      this.animateFrameId = requestAnimationFrame(function tik() { 
         workspace.tik();

         if (workspace.playing) { 
            requestAnimationFrame(tik);
         }
      }.bind(this));
   }

   public stop() { 
      if (!this.playing) return;
      this.playing = false;

      this.trigger('stop');
   }

   private tik() { 
      this.onresize();
      this.render.render();
   }

   private initRender(): void { 
      this.render.init(this.els.canvas, this.els.root);
   }

   private initEvents(): void {
      window.addEventListener('resize', (event) => {
         this.onresize();
      });

      window.addEventListener('load', () => { 
         this.onresize();
      });

      this.addEvent('resize', () => { 
         this.onresize();
      });
   }

   private onresize() { 
      this.render.updateMetrix(); 
      this.render.updateSize();
   }

   private getElements(root: Element): void { 
      this.els.root = root;
      this.els.canvas = root.querySelector('.workspace__canvas');
   }
}