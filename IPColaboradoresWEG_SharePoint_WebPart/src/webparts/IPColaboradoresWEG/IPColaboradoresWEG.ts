import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';

interface IIpColaboradoresWegWebPartProps {
  fontColor?: string;
  fontSize?: string;
  backgroundType?: string;
  backgroundColor?: string; 
  prefixo?: string;
}

export default class IpColaboradoresWeg extends BaseClientSideWebPart<IIpColaboradoresWegWebPartProps> {

  public async render(): Promise<void> {

    const ip = await this._getIP();
    const fontColor = this.properties.fontColor || '#000';
    const fontSize = this.properties.fontSize || '20px';
    let backgroundStyle = '';
    const prefixo = this.properties.prefixo || '';

    if (this.properties.backgroundType === 'color') {
      backgroundStyle = `background-color: ${this.properties.backgroundColor || '#fff'};`;
    } else if (this.properties.backgroundType === 'customImage') {
      backgroundStyle = `background-image: url('${this.properties.backgroundColor}'); background-size: cover;`;
    }

    this.domElement.innerHTML = `
      <div style="font-size: ${fontSize}; color: ${fontColor}; ${backgroundStyle} padding: 10px;">
        ${prefixo ? prefixo + ' ' : ''}${ip}
      </div>
    `;
  }
  
  private async _getIP(): Promise<string> {
    try {
      const response = await fetch("https://wpt.weg.net/COLABORADORES/controllers/controller_api_ip.php");
      const data = await response.text();
      console.log('IP fetched:', data);
      return data.trim();
    } catch (error) {
      console.error("Error fetching IP:", error);
      return "Error: " + error.message;
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "" },
          groups: [
            {
              groupName: "",
              groupFields: [
                PropertyPaneTextField('fontColor', { label: 'Cor da letra' }),
                PropertyPaneTextField('fontSize', { label: 'Tamanho da letra' }),
                PropertyPaneChoiceGroup('backgroundType', {
                  label: 'Tipo de Fundo',
                  options: [
                    { key: 'color', text: 'Cor' },
                    { key: 'customImage', text: 'Imagem Personalizada' }
                  ]
                }),
                PropertyPaneTextField('backgroundColor', { label: 'Cor ou URL da imagem' }),
                PropertyPaneTextField('prefixo', { label: 'Prefixo' }) 
              ]
            }
          ]
        }
      ]
    };
  }
}
