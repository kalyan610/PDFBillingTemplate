import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PsawsTrackerWebPartStrings';
import PsawsTracker from './components/PsawsTracker';
import { IPsawsTrackerProps } from './components/IPsawsTrackerProps';

export interface IPsawsTrackerWebPartProps {
  description: string;
}

export default class PsawsTrackerWebPart extends BaseClientSideWebPart<IPsawsTrackerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPsawsTrackerProps> = React.createElement(
      PsawsTracker,
      {
        url: this.context.pageContext.web.absoluteUrl,
        context:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
