// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        go:false,
        back:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //var zNode = this.node.getChildByName("z");
        //this.zTxt = zNode.getComponent("cc.Label");
        this.go = false;
        this.back = false;
        this.InitKeyInputControl();
    },


    InitKeyInputControl:function()
    {
        var self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,
        function(event)
        {
            switch(event.keyCode)
            {
                case cc.macro.KEY.w: 
                {
                    self.go = true;                 
                    break;    
                }   
                case cc.macro.KEY.s:
                {   
                    self.back = true;                   
                    break; 
                }   
                case cc.macro.KEY.a:
                {                     
                    break; 
                }   
                case cc.macro.KEY.d:
                {                     
                    break; 
                }
            }
        });

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, 
            function(event)
            {
                switch(event.keyCode)
                {
                    case cc.macro.KEY.w:
                        { 
                             self.go = false;                          
                             break;
                        }
                        case cc.macro.KEY.s:
                        {  
                            self.back = false;                    
                            break; 
                        }   
                        case cc.macro.KEY.a:
                        {                      
                            break; 
                        }   
                        case cc.macro.KEY.d:
                        {                       
                            break; 
                        }
                }
            });
        
    },

    update (dt) {

        var speed = 100;
       // if(this.go)
        {
            this.node.z += dt * speed;   
        }

        if(this.back)
        {
            this.node.z -= dt * speed;
        }

       // this.zTxt.string = this.node.z;


    },

    onCollisionEnter:function(other, self)
    {
        cc.log("onCollisionEnter Hero");
    },

});
