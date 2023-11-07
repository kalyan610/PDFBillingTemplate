import * as React from 'react';
import styles from './PsawsTracker.module.scss';
import { IPsawsTrackerProps } from './IPsawsTrackerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Stack, IStackTokens, StackItem,IStackStyles } from 'office-ui-fabric-react'; 
import { Button,PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import Service from './Service';
import {Icon} from 'office-ui-fabric-react/lib/Icon';
const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };
const stackButtonStyles: Partial<IStackStyles> = { root: { width: 20 } };
export interface PSAWSTrackerstate{

  TestID:any;
  Issue:any;
  IssueSource:any;
  IssueDescription:any;
  FileValue:any;
  disableFileUpload:boolean;
  Addcomments:any;
}
let RootUrl = '';
export default class PsawsTracker extends React.Component<IPsawsTrackerProps, PSAWSTrackerstate > {

  public _service: any;
  public GlobalService: any;
  protected ppl;
  public constructor(props:IPsawsTrackerProps){
    super(props);
    this.state={
      TestID:"",
      Issue:"",
      IssueSource:"",
      IssueDescription:"",
      FileValue:[],
      disableFileUpload:false,
      Addcomments:""
    };

    RootUrl = this.props.url;

    this._service = new Service(this.props.url, this.props.context);

    this.GlobalService = new Service(this.props.url, this.props.context);

  }

  private async Test (){


  }
  private changeTestID(data: any): void {

    const re = /^[0-9\b]+$/;
      if (data.target.value === '' || re.test(data.target.value)) 
      {
         this.setState({TestID: data.target.value})
      }

  }

  private changeIssue(data: any): void {

    this.setState({ Issue: data.target.value });

  }
  
  private changeIssueDescription(data: any): void {

    this.setState({ IssueDescription: data.target.value });
  }

  private changeFileupload(data: any) {

    let LocalFileVal= this.state.FileValue;
    
     LocalFileVal.push(data.target.files[0]);
    
    
    this.setState({FileValue:LocalFileVal});
    
    if(this.state.FileValue.length>5)
    {
    this.setState({disableFileUpload:true});
    
    }
    
    
    }

    private _removeItemFromDetail(Item: any) {
      console.log("itemId: " + Item.name); 
    
     let localFileValues=[];
    
     localFileValues=this.state.FileValue;
    
     if(localFileValues.length==1)
     {
    
      localFileValues=[];
     }
    
    
     for(var count=0;count<localFileValues.length;count++)
      {
    
        if(localFileValues[count].name==Item.name)
          {
            let Index=count;
    
            localFileValues.splice(Index,count);
    
          }
        }
          this.setState({FileValue:localFileValues,disableFileUpload:false});


        
        }
      

      private OnBtnClick() :void {

         if (this.state.TestID == null  || this.state.TestID == '') {

          alert('Please enter Test ID');
         }

         else if (this.state.Issue == null  || this.state.Issue == '')
         {
          alert('Please enter Issue');
         }
         
         else if (this.state.IssueDescription == null  || this.state.IssueDescription == '')
         {
          alert('Please enter Issue Description');
         }

         
         else
         {

     
          let myfiles=[];

    for(var count=0;count<this.state.FileValue.length;count++)
    {
      
      myfiles.push(this.state.FileValue[count]);
    }

    //alert('Test');

    this._service.onDrop1(this.state.TestID,this.state.Issue,this.state.IssueDescription,myfiles).then(function (data:any)
    {

      console.log(data);

      alert('Record Submitted Successfully');

      window.location.replace("https://capcoinc.sharepoint.com/sites/InternalApplicationsTesting/");

    });



          
          // this._service.Save(this.state.TestID).then(function (data: any)
          // {
      
          //   console.log(data);
      
          //   alert('Record submitted successfully');
      
          //   window.location.replace("https://capcoinc.sharepoint.com/sites/capcointernalapplications/CapcoInternalApplicationsDevelopmentTesting/");
      
            
          // });
      
        
          // }

         
        }

        
      


}
  public render(): React.ReactElement<IPsawsTrackerProps> {
    return (
      <Stack tokens={stackTokens} styles={stackStyles} >
      <Stack>
      
      <b><label className={styles.labelsFonts}>1. Test ID</label></b><br/>
      <div>
      <input type="text" name="txtTestid" value={this.state.TestID} onChange={this.changeTestID.bind(this)} className={styles.boxsize} />
      </div>
      <b>Note: This is the left-most ID number of your test item on the SharePoint list.</b><br/>
      <b><label className={styles.labelsFonts}>2. Issue</label></b><br/>
      <div>
      <input type="text" name="txtIssue" value={this.state.Issue} onChange={this.changeIssue.bind(this)} className={styles.boxsize} />
      </div><br/>
      
      <b><label className={styles.labelsFonts}>3. Issue Description</label></b><br/>
      <div>
     
      <textarea id="txtIssueDescription" value={this.state.IssueDescription} onChange={this.changeIssueDescription.bind(this)} className={styles.textAreacss} ></textarea>
           </div><br/>
         

<b><label className={styles.labelsFonts}>4. Supporting Attachments</label></b><br/>
           <div>

          <input id="attachmentFiles" type="file"  name="files[]"  onChange={this.changeFileupload.bind(this)} disabled={this.state.disableFileUpload}/>

        
           {this.state.FileValue.map((item:any,index:any) =>(

            <div className={styles.padcss}>  
            
            {item.name} <Icon iconName='Delete'  onClick={(event) => {this._removeItemFromDetail(item)}}/>

            </div>
         
          ))}
</div><br/><b>Attachment max of 6</b>
<br/>
          

           <PrimaryButton text="Submit" onClick={this.OnBtnClick.bind(this)} styles={stackButtonStyles} className={styles.Mybutton}/>

          
         </Stack>
        
      </Stack>
    );
    }
  }