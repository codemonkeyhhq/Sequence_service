import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from '@material-ui/core/Input';

//component for sequence search, creat, import by json or export json
class Dashboard extends Component {
    constructor(props){
        super(props);
        var myMap=new Map();
        var mySet=new Set();
        //hook listen change on the state value.
        //input value in text filed stored in store for error message generate
        this.state={index:0,sequence_list:[],
        mod:0,curS:null,searchText:"",map:myMap,
        message:0,messageContent:"",
        name:"",des:"",full:"",set:mySet,upload:0
        };
        this.changeIndex=this.changeIndex.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.displaySequence=this.displaySequence.bind(this);
        this.search=this.search.bind(this);
        this.displayDialog=this.displayDialog.bind(this);
        this.closeDialog=this.closeDialog.bind(this);
        this.insertSequence=this.insertSequence.bind(this);
        this.changeName=this.changeName.bind(this);
        this.changeDes=this.changeDes.bind(this);
        this.changeFull=this.changeFull.bind(this);
        this.validateSquence=this.validateSquence.bind(this);
        this.openUpload=this.openUpload.bind(this);
        this.closeUpload=this.closeUpload.bind(this);
        this.inputFile=this.inputFile.bind(this);
        this.export=this.export.bind(this);
    }
    //view the full sequence
    displaySequence(e,it){
        this.setState({curS:it,mod:1});
    }
    //view message and close
    displayDialog(e){
        this.setState({message:1});
    }
    closeDialog(e){
        this.setState({message:0});
    }
    //divide the string in to char list and assign each words one color in color scheme
    changeCharColor(){
        let colorMessage=[];
        colorMessage[0]=(<div/>);
        if(this.state.curS){
            var list=this.state.curS.sequence.split('');
            var colorScheme=[{"color":"red","font-weight":"bold"},{"color":"orange","font-weight":"bold"},{"color":"darkyellow","font-weight":"bold"},{"color":"darkolivegreen","font-weight":"bold"},{"color":"green","font-weight":"bold"},{"color":"blue","font-weight":"bold"},{"color":"purple","font-weight":"bold"},{"color":"black","font-weight":"bold"}];
            for(let i=0;i<list.length;i++){
                if(i%50==0){
                    colorMessage[i]=(
                        <span style={colorScheme[i%8]}><br/>{list[i]}</span>
                    )
                }
                else{colorMessage[i]=(
                    <span style={colorScheme[i%8]}>{list[i]}</span>
                )}
            }
        }
        return colorMessage;
    }
    //create one cell for each element in the list
    renderColumn(list,index){
        return list.map((it,i)=>{
            return(
                <div className="Column" value={it} >
                <Typography color="textSecondary">{it.sequenceName}</Typography>
                <Typography variant="body2" component="p">{it.sequenceDescription}</Typography>
                <Button value={it} variant="outlined" size="small" color="primary" onClick={(e)=>{this.displaySequence(e,it)}}>Sequence</Button>
                </div>
            );
        });
    }
    //create one row, use 3 element for one group and call rendercolumn function
    renderList() {
       var list=this.state.sequence_list
       if(list&&list.length>0) {
      return list.map((item,index) => {
        if(index%4!=0)return (<div></div>);
        else{
            var tmp=list.slice(index,index+4>=list.length? list.length:index+4)
        return (
          <div className="Row">
          {this.renderColumn(tmp,index)}
          </div>
        );
    }
    });}
        else{
            return (
              <div>
                <Typography color="textPrimary">There is no data matches</Typography>
              </div>
            );
        }
    }
    //control tabs view
    changeIndex(e,newValue){
        this.setState({index: newValue});
    }
    //create a cheat sheet for properties
    allProps(index){
        return{
            id:'full-width-tab-${index}',
            'aria-controls':'full-width-tabpanel-${index}'
        };
    }
    //find all sequence by name matching the search text using map
  search(e){
      var value=e.target.value
      this.setState({searchText:value});
      var list=this.state.map.get(value)
      this.setState({sequence_list:list});
  }
  closeModal(){
      this.setState({mod:0});
  }
  //after validation, a new sequence is inserted in the map based on name's prefix and sorted by name
  //exp:sequence:{ABC}  map{A:sequence} {AB:sequence} {ABC:sequnce}
  insertSequence(sequence){
      var map=this.state.map;
      var name=sequence.sequenceName
      for(var i=0;i<name.length;i++){
          var curString=name.substring(0,i+1);
          //if prefix exsist,insert in to list
          if(map.get(curString)){
            var list=map.get(curString)
            var status=true;
            for(var j=0;j<list.length;j++){
                if(list[j].sequenceName>name){
                    list.splice(j,0,sequence);
                    map.set(curString,list);
                    status=false;
                    break;
                }
            }
            if(status){list.push(sequence);
            map.set(curString,list);}
          }
          else{
             var list=[sequence];
             map.set(curString,list);
          }
      }
      this.setState({map:map})
  }
  addSequence(e){
      var sequence={sequenceDescription:this.state.des,sequenceName:this.state.name,sequence:this.state.full};
      this.validateSquence(sequence);
  }
  //check required file for sequnce
  validateSquence(sequence){
            console.log(sequence)
            if(sequence.sequenceDescription&&sequence.sequenceName&&sequence.sequence){
              var massageText="";
              var set=this.state.set;
              if(!set.has(sequence.sequence)){
                  var english=/^[A-Za-z]*$/;
                  if(english.test(sequence.sequence)){
                      this.insertSequence(sequence);
                      massageText="New Sequence added. Seach it in the previous page";

                      set.add(sequence.sequence);
                      this.setState({name:"",des:"",full:"",set:set});
                  }
                  else{
                      massageText="Sequence should only contains A-Z/a-z Character"
                  }
              }
              else{
                  massageText="This sequence already exsist.Search it in the previous"
              }
            }
            else{
                massageText="Please fill name, description and full sequence in the text filed."
            }
            this.setState({messageContent:massageText});
            this.displayDialog()
  }
  changeName(e){
      this.setState({name:e.target.value})
  }
  changeFull(e){
      this.setState({full:e.target.value})
  }
  changeDes(e){
      this.setState({des:e.target.value})
  }
  //open or close the upload panel
  closeUpload(e){
      this.setState({upload:0})
  }
  openUpload(e){
      this.setState({upload:1})
  }
  //exoprt json file of the selected sequnce
  export(){
      var FileSaver =require('file-saver');
      var content=JSON.stringify(this.state.curS);
      var type="data:application/json;charse=utf-8";
      var blob=new Blob([content],{type:type});
      FileSaver.saveAs(blob,"sequence.json");
  }
  //fs read function is async
  readUploadedFileAsText(inputFile){
   const temporaryFileReader = new FileReader();
   return new Promise((resolve, reject) => {
     temporaryFileReader.onerror = () => {
       temporaryFileReader.abort();
       reject(new DOMException("Problem parsing input file."));
     };
     temporaryFileReader.onload = () => {
       resolve(temporaryFileReader.result);
     };
     temporaryFileReader.readAsText(inputFile);
   });
 };
   //call readUploadedFileAsText and only after finish reading files,start creating
 async inputFile(event){
   event.persist();
   var files = document.getElementById('selectFiles').files;
   if (!event|| !files) {
      console.log(event)
      return;
   }
   const fileList = files;
   const latestUploadedFile = fileList.item(fileList.length - 1);
   try {
     var fileContents = await this.readUploadedFileAsText(latestUploadedFile);
     fileContents=JSON.parse(fileContents);
     if(fileContents.sequences){
        this.setState({upload:0});
        for(var i=0;i<fileContents.sequences.length;i++){
            this.validateSquence(fileContents.sequences[i]);
        }
     }
   } catch (e) {
     console.log(e);
   }
 };
  render() {
    return (
        <div className="container">
          <BrowserRouter>
          <Paper >
            <Tabs value={this.state.index} onChange={(e,newValue)=>{this.changeIndex(e,newValue)}} indicatorColor="primary" textColor="primary" centered >
                <Tab label="Sequence Search" {...this.allProps(0)}></Tab>
                <Tab label="Import Sequence" {...this.allProps(1)}></Tab>
            </Tabs>
          </Paper>
          <SwipeableViews index={this.state.index} >
            <div>
                <div className="searchText">
                  <TextField value={this.state.searchText} id="standard-search" label="Search Sequence" type="search" color="primary" placeholder="search by name" onChange={(e)=>{this.search(e)}} />
                </div>
                <div>
                    {this.renderList()}
                </div>
            </div>
            <div>
            <div className="Row_center">
            <TextField
                id="outlined-multiline-flexible"
                    label="Sequence Name"
                    multiline
                    rowsMax="2"
                    value={this.state.name}
                    variant="outlined"
                    onChange={(e)=>{this.changeName(e)}}
            />
            <TextField
            id="outlined-multiline-flexible"
                label="Description"
                multiline
                rowsMax="2"
                value={this.state.des}
                variant="outlined"
                onChange={(e)=>{this.changeDes(e)}}
            />
            <TextField
            id="outlined-multiline-flexible"
                label="Full Sequence"
                multiline
                rowsMax="2"
                variant="outlined"
                value={this.state.full}
                onChange={(e)=>{this.changeFull(e)}}

            />
            </div>
            <div className="Row_button" >
            <ButtonGroup
              variant="text"
              color="secondary"
              size="large"
              aria-label="large contained secondary button group"
            >
              <Button color="primary" onClick={(e)=>{this.addSequence(e)}} >CREAT</Button>
              <Button color="primary" onClick={(e)=>{this.openUpload(e)}}>IMPORT</Button>
            </ButtonGroup>
            </div>
            </div>
            </SwipeableViews>
            <div>
              <Modal isOpen={this.state.mod===1? true:false} onrequestClost={this.closeModal}>
                  <div className="Row">
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    size="large"
                    aria-label="large contained secondary button group"
                  >
                      <Button  size="small" color="secondary" onClick={this.closeModal}>CLose</Button>
                    <Button  size="small" color="secondary" onClick={this.export}>export</Button>
                  </ButtonGroup>
                  </div>
                  <div className="searchArea">
                      {this.changeCharColor()}
                  </div>
              </Modal>
            </div>
            <div>
                <Dialog
                open={this.state.message===1? true:false}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {"Message"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {this.state.messageContent}
                </DialogContentText>
                </DialogContent>
                <Button color="primary" onClick={(e)=>{this.closeDialog(e)}}>
                    Get it
                </Button>
                </Dialog>
          </div>
          <div>
                <Dialog
                open={this.state.upload===1? true:false}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <input type="file" id="selectFiles"></input>
                    <Button color="primary" onClick={(e)=>{this.inputFile(e)}}>
                        Upload
                    </Button>
                    <Button color="secondary" onClick={(e)=>{this.closeUpload(e)}}>
                        Close
                    </Button>
                </Dialog>
          </div>
          </BrowserRouter>
        </div>
    );
  }
}
export default connect(null,actions)(Dashboard);
