import { Injector } from '@angular/core';
import { FormioCustomComponentInfo, registerCustomFormioComponent, FormBuilderComponent, ExtendedComponentSchema, registerCustomTag, Components, createCustomFormioComponent } from '@formio/angular';
import { RatingWrapperComponent } from './rating-wrapper.component';
import { createCustomElement } from '@angular/elements'

interface IForm {
  components: ExtendedComponentSchema[];
}

const COMPONENT_OPTIONS: FormioCustomComponentInfo = {
  type: 'myrating', // custom type. Formio will identify the field with this type.
  selector: 'my-rating', // custom selector. Angular Elements will create a custom html tag with this selector
  title: 'Rating', // Title of the component
  group: 'data', // Build Group
  icon: 'star', // Icon
  editForm: minimalEditForm,
//  template: 'input', // Optional: define a template for the element. Default: input
//  changeEvent: 'valueChange', // Optional: define the changeEvent when the formio updates the value in the state. Default: 'valueChange',
//  editForm: Components.components.textfield.editForm, // Optional: define the editForm of the field. Default: the editForm of a textfield
//  documentation: '', // Optional: define the documentation of the field
//  weight: 0, // Optional: define the weight in the builder group
//  schema: {}, // Optional: define extra default schema for the field
//  extraValidators: [], // Optional: define extra validators  for the field
//  emptyValue: null, // Optional: the emptyValue of the field
};


// Not WORK --> DOMException: CustomElementRegistry.define: 'my-rating' has already been defined as a custom element
export function registerRatingComponentDoesntWork(injector: Injector) {
  registerCustomFormioComponent(COMPONENT_OPTIONS, RatingWrapperComponent, injector);
}

 
export function registerRatingComponent(injector: Injector){
 

 
  if (!customElements.get(COMPONENT_OPTIONS.selector)) {
    registerCustomTag(COMPONENT_OPTIONS.selector, injector);
    var complexCustomComponent = createCustomElement(RatingWrapperComponent, { injector: injector });
    customElements.define(COMPONENT_OPTIONS.selector, complexCustomComponent);
    console.log('customElements.define '+COMPONENT_OPTIONS.selector);
    Components.setComponent(COMPONENT_OPTIONS.type, createCustomFormioComponent(COMPONENT_OPTIONS));
  }else{
    console.log('already registred: '+COMPONENT_OPTIONS.selector);
  }
 
   
}

export function minimalEditForm(): IForm {
  return {
    components: [
      { key: 'type', type: 'hidden' },
      {
        weight: 0,
        type: 'textfield',
        input: true,
        key: 'label',
        label: 'Label',
        placeholder: 'Label',
        validate: {
          required: true,
        },
      },
      {
        weight: 10,
        type: 'textfield',
        input: true,
        key: 'key',
        label: 'Field Code',
        placeholder: 'Field Code',
        tooltip: 'The code/key/ID/name of the field.',
        validate: {
          required: true,
          maxLength: 128,
          pattern: '[A-Za-z]\\w*',
          patternMessage:
            'The property name must only contain alphanumeric characters, underscores and should only be started by any letter character.',
        },
      },
      {
        weight: 20,
        type: 'textfield',
        input: true,
        key: 'customOptions.myOption',
        label: 'My Custom Option',
        placeholder: 'My Custom Option',
        validate: {
          required: true,
        },
      },
    ],
  } as IForm;
}
