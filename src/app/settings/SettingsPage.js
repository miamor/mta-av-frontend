import React, {Component} from 'react'
import { translate } from '../../services/translate'

class SettingsPage extends Component{
    render(){
        return(
            <div className='SettingsPage'>
                <h1 className='PageTitle'>{translate['Settings']}</h1>

                <div class="cardo">
                    <div class="cardo-header">
                        <h3 id="title">{translate['Basic settings']}</h3>
                    </div>
                    <div class="cardo-content">
                        <div class="cardo-content-list">
                            <div class="rows">
                                <a class="label">{translate['Sandbox']}</a>
                                <div class="value"> 
                                    <input type="checkbox" name="sandbox" checked disabled value="Cuckoo"/> Cuckoo
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>


                <div class="cardo">
                    <div class="cardo-header">
                        <h3 id="title">{translate['Engines']}</h3>
                    </div>
                    <div class="cardo-content">
                        <div class="cardo-content-list">
                            <div class="rows">
                                <a class="label">{translate['HAN']}</a>
                                <div class="value"> 
                                    <div>
                                        <input type="checkbox" name="engines[]" checked value="HAN"/> Select this engine
                                    </div>
                                    <div class="han-models-list">
                                        <div>
                                            <input type="radio" name="han_model" checked disabled value="1"/> Skip gram + TF-IDF
                                        </div>
                                        <div>
                                            <input type="radio" name="han_model" disabled value="2"/> Skip gram + TF-IDF (no edge-weighing)
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>

                        <div class="cardo-content-list">
                            <div class="rows">
                                <a class="label">{translate['VirusTotal']}</a>
                                <div class="value"> 
                                    <input type="checkbox" name="engines[]" checked value="virustotal"/> Select this engine
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default SettingsPage