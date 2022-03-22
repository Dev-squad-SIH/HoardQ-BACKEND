const mongoose=require('mongoose');

const subjectProviderSchema=mongoose.Schema({
    types:[
    {
        type:String
    }
    ],
    difficulties:[
        {
            type:String
        }
    ],
    subjects:[
        {
            type:String
        }
    ],
    topics:{
        English:[
            {
                type:String
            }
        ],
        Maths:[
            {
                type:String
            }
        ],
        Physics:[
            {
                type:String
            }
        ],
        Chemistry:[
            {
                type:String
            }
        ],
        Biology:[
            {
                type:String
            }
        ]
    }
});

module.exports=mongoose.model("subjectProvider",subjectProviderSchema);