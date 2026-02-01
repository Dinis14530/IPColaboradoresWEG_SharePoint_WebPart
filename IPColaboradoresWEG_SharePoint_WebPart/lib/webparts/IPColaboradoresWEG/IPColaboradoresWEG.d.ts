import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
interface IIpColaboradoresWegWebPartProps {
    fontColor?: string;
    fontSize?: string;
    backgroundType?: string;
    backgroundColor?: string;
    prefixo?: string;
}
export default class IpColaboradoresWeg extends BaseClientSideWebPart<IIpColaboradoresWegWebPartProps> {
    render(): Promise<void>;
    private _getIP;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
export {};
//# sourceMappingURL=IPColaboradoresWEG.d.ts.map