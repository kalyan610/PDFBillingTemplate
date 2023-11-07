import  {sp} from "@pnp/sp/presets/all";

import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/attachments";
import "@pnp/sp/files";


export default class Service {

    public mysitecontext: any;

    public constructor(siteUrl: string, Sitecontext: any) {
        this.mysitecontext = Sitecontext;


        sp.setup({
            sp: {
                baseUrl: siteUrl

            },
        });

    }



   

  


//    private async Save(TestID:string,Issue:string,IsuueSource:string,IssueDescription:string,):Promise<any>     {       
  
   
// await sp.web.lists.getByTitle('PDF Billing Template Issue tracker TEST').items.add({  
    
  

        
// Title:TestID,
// Issue:Issue,
// IssueSource:IsuueSource,
// IssueDescription:IssueDescription

   
   
// }).then (async r => {
//     // this will add an attachment to the item we just created to push t sharepoint list

 
// })
//    }



//   catch (error) {
//     console.log(error);
//   }
// }

private async onDrop1 (TestID:string,Issue:string,IssueDescription:string,acceptedFiles:any)  {

 

    let Myval='Completed';



    try

    {



      let file=acceptedFiles;



      let Varmyval= await sp.web.lists.getByTitle("PS AWS Issue Tracker").items.add({



        Title:TestID,
        Issue:Issue,
        
Description:IssueDescription

    }).then (async r => {

      // this will add an attachment to the item we just created to push t sharepoint list



    for(var count=0;count<file.length;count++)

    {

     await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {

    console.log(result);



      })



    }



    return Myval;

})


return Varmyval;


  }


catch (error) {

    console.log(error);

  }


 }

  
}





