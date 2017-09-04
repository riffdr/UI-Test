import React from "react";

export default class Registration extends React.Component {
  constructor() {
    super();

    this.changeType = this.changeType.bind(this);
    this.checkEntry = this.checkEntry.bind(this);
    this.checkForm = this.checkForm.bind(this);

    // Language Library to populate markup
    this.langLib = {
        h1: 'Register',
        first_paragraph: 'Please finalise your registration before you can proceed',
        second_paragraph: 'You will then confirm your deposit',
        cta_text: 'Complete registration',
        inputs: {
            first_name : {
                name: 'first_name',
                label : 'First Name',
                placeholder : 'First Name'
            },
            last_name : {
                name: 'last_name',
                label : 'Last Name',
                placeholder : 'Last Name'
            },
            address : {
                name: 'address',
                label : 'Enter your house no. and street name',
                placeholder : 'address'
            },
            postcode : {
                name: 'postcode',
                label : 'postcode',
                placeholder : 'postcode'
            },
            city : {
                name: 'city',
                label : 'city',
                placeholder : 'city'
            },
            phone : {
                name: 'phone',
                label : 'phone number',
                placeholder : 'phone number'
            },
            dob : {
                name: 'dob',
                label : 'Date of birth dd/mm/yyyy',
                placeholder : 'Date of birth'
            },
            gender : {
                name: 'gender',
                label : 'Male',
                value : 'male',
                label2 : 'Female',
                value2 : 'female',
            },
            country : {
                name: 'country',
                label : 'country',
                options: {
                    SE : 'Sweden',
                    UK : 'United Kingdom',
                    ES : 'Spain'
                }
            },
            areaCode : {
                name: 'areaCode',
                label : 'Country Code',
                options: {
                    '+36': '36',
                    '+44': '44',
                    '+34': '34'
                }
            },


        }
    },

    this.state = {
      type: null,
      inputs:
        {
            first_name : {
                type: 'text',
                stateClassName : ' form__field--success',
                value : 'Daniel'
            },
            last_name : {
                type: 'text',
                stateClassName : null,
                value : null
            },
            address : {
                type: 'text',
                stateClassName : null,
                value : null
            },
            postcode : {
                type: 'text',
                stateClassName : null,
                value : null
            },
            city : {
                type: 'text',
                stateClassName : null,
                value : null
            },
            dob : {
                type: 'text',
                stateClassName : null,
                value : null
            },
            phone : {
                type: 'number',
                stateClassName : null,
                value : null
            },
            gender : {
                type: 'radio',
                stateClassName : null,
                value : null
            },
            country : {
                type: 'select',
                stateClassName : null,
                value : this.langLib.inputs.country.options.SE
            },
            areaCode : {
                type: 'select',
                stateClassName : null,
                value : this.langLib.inputs.areaCode.options['+36']
            }
        }
    };
  }

  // To be triggered when CTA is clicked/tapped
  checkForm () {
      let clonedState = JSON.parse(JSON.stringify(this.state));

      for (let key of Object.keys(this.state.inputs)) {;
          if (clonedState.inputs[key].value && clonedState.inputs[key].value !== '') {
              clonedState.inputs[key].stateClassName = ' form__field--success';
          } else {
              clonedState.inputs[key].stateClassName = ' form__field--error';
          }
      }
      this.setState(clonedState);
  }

  // Change type of date input in order to have its placeholder readable
  changeType (newType, e) {
      let clonedState = JSON.parse(JSON.stringify(this.state));
      clonedState.inputs.dob.type = newType;
      this.setState(clonedState);
  }

  // Validate input entry, if valid gets added to this.state and success Classname flag gets added to this.state as well
  checkEntry(e) {
    const value  = e.target.value;
    const name  = e.target.name;
    const type  = e.target.type;
    let clonedState = JSON.parse(JSON.stringify(this.state));

    if (type === 'select' || type === 'radio'  ) {
      clonedState.inputs[name].value = value;
    }
    else if( (type !== 'date' && !this.isEmpty(value)) || (type === 'date' && (value && value !== 'dd/mm/yyyy'))){
      clonedState.inputs[name].stateClassName = ' form__field--success';
      clonedState.inputs[name].value = value;
    } else {
       clonedState.inputs[name].stateClassName = ' form__field--error';
       clonedState.inputs[name].value = null;
    }

    this.setState(clonedState);
  }

  // Check if string is empty
  isEmpty (string) {
    return (string.length === 0 || !string.trim());
  }

  render() {

    var options_country_contained = Object.keys(this.langLib.inputs.country.options).map((key, i) => {
        return <option className={"select__option select__option" + key} value={key}>{this.langLib.inputs.country.options[key]}</option>
    }),
        options_areaCode_contained = Object.keys(this.langLib.inputs.areaCode.options).map((key2, a) => {
        return <option className={"select__option select__option" + key2 } value={this.langLib.inputs.areaCode.options[key2]}>{key2}</option>
    });

    return (
    <article className="container article">
         <a className="link link--back glyphicon glyphicon-arrow-67"></a>
         <h1 className="heading heading--h1">{this.langLib.h1}</h1>
         <p className="paragraph">{this.state.inputs.first_name.value + ' ' + this.langLib.first_paragraph}</p>
         <div className="form form--registration">
            <div className="fieldset">
                <div className={"form__field form__field--name " + ' '+ (this.state.inputs.first_name.stateClassName ? this.state.inputs.first_name.stateClassName : '')}>
                    <label className="form__label">{this.langLib.inputs.first_name.label}</label>
                    <input value={this.state.inputs.first_name.value} className='form__input form__input'  type={this.state.inputs.first_name.type} tabIndex="1" onChange={this.checkEntry.bind(this)} name={this.langLib.inputs.first_name.name} placeholder={this.langLib.inputs.first_name.placeholder} />
                </div>
                <div className={"form__field form__field--name " + ' ' + (this.state.inputs.last_name.stateClassName ? this.state.inputs.last_name.stateClassName : '')}>
                    <label className="form__label">{this.langLib.inputs.last_name.label}</label>
                    <input className='form__input form__input'  type={this.state.inputs.last_name.type} tabIndex="1" onChange={this.checkEntry.bind(this)} name={this.langLib.inputs.last_name.name} placeholder={this.langLib.inputs.last_name.placeholder} />
                </div>
                <div className={"form__field form__field--dob" + ' ' + (this.state.inputs.dob.stateClassName ? this.state.inputs.dob.stateClassName : '')}>
                    <label className="form__label">{this.langLib.inputs.dob.label}</label>
                    <input className="form__input"  type={this.state.inputs.dob.type} onFocus={this.changeType.bind(this, 'date')} onChange={this.checkEntry.bind(this)} onBlur={this.changeType.bind(this, 'text')} name={this.langLib.inputs.dob.name} tabIndex="3" placeholder={this.langLib.inputs.dob.placeholder} />
                </div>
                <div className="form__field form__field--radio form__field--gender">
                    <label className="form__field__subcontainer radio" >
                        <input onChange={this.checkEntry.bind(this)} className="form__input radio__input" type={this.state.inputs.gender.type} value={this.langLib.inputs.gender.value} tabIndex="4" defaultChecked  name={this.langLib.inputs.gender.name}  />
                        <span className="radio__button"></span>
                        <span className="form__label radio__label">{this.langLib.inputs.gender.label}</span>
                    </label>
                    <label className="form__field__subcontainer radio">
                        <input onChange={this.checkEntry.bind(this)} className="form__input radio__input" type={this.state.inputs.gender.type} value={this.langLib.inputs.gender.value2} tabIndex="4"  name={this.langLib.inputs.gender.name}  />
                        <span className="radio__button"></span>
                        <span className="form__label radio__label">{this.langLib.inputs.gender.label2}</span>
                    </label>
                </div>
                <div className={"form__field form__field--address"   + ' ' + (this.state.inputs.address.stateClassName ? this.state.inputs.address.stateClassName : '')}>
                    <label className="form__label">{this.langLib.inputs.address.label}</label>
                    <input className="form__input" type={this.state.inputs.address.type} name={this.langLib.inputs.address.name}  onChange={this.checkEntry.bind(this)} tabIndex="5" placeholder={this.langLib.inputs.address.placeholder} />
                </div>
                
            </div>
            <div className="fieldset">
                <div className={"form__field form__field--postcode" + ' ' + (this.state.inputs.postcode.stateClassName ? this.state.inputs.postcode.stateClassName : '')}>
                    <label className="form__label">{this.langLib.inputs.postcode.label}</label>
                    <input className="form__input" type={this.state.inputs.postcode.type} name={this.langLib.inputs.postcode.name}  onChange={this.checkEntry.bind(this)} tabIndex="6" placeholder={this.langLib.inputs.postcode.placeholder} />
                </div>
                <div className={"form__field form__field--city" + ' ' + (this.state.inputs.city.stateClassName ? this.state.inputs.city.stateClassName : '')}>
                    <label className="form__label">{this.langLib.inputs.city.label}</label>
                    <input className="form__input" type={this.state.inputs.city.type}  name={this.langLib.inputs.city.name}  onChange={this.checkEntry.bind(this)}  tabIndex="7"  placeholder={this.langLib.inputs.city.placeholder} />
                </div>
                <div className="form__field form__field--country">
                    <label className="form__label">{this.langLib.inputs.country.label}</label>
                    <div className="form__field__select form__field__subcontainer">
                        <select className="select form__input"  name={this.langLib.inputs.country.name}  tabIndex="8" onChange={this.checkEntry.bind(this)} >
                            {options_country_contained}
                        </select>
                    <span className="select__icon"></span>
                    </div>
                </div>
                <div className="form__field form__field--areaCode">
                    <label className="form__label">{this.langLib.inputs.areaCode.label}</label>
                    <div className="form__field__select form__field__subcontainer">
                        <select className="select form__input" tabIndex="9" name={this.langLib.inputs.areaCode.name}  onChange={this.checkEntry.bind(this)} >
                            {options_areaCode_contained}
                        </select>
                        <span className="select__icon"></span>
                    </div>
                </div>
                <div className={"form__field form__field--telephone" + ' ' + (this.state.inputs.phone.stateClassName ? this.state.inputs.phone.stateClassName : '')}>
                    <label className="form__label">{this.langLib.inputs.phone.label}</label>
                    <input className="form__input" type={this.state.inputs.phone.type} name={this.langLib.inputs.phone.name} onChange={this.checkEntry.bind(this)}  tabIndex="10" placeholder={this.langLib.inputs.phone.placeholder}  />
                </div>
            </div>
            <button className="button" onClick={this.checkForm.bind(this)} > {this.langLib.cta_text}</button>
            <p className="paragraph">{this.langLib.second_paragraph}</p>
        </div>
    </article>
  );
  }
}