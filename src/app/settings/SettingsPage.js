import React, { Component } from 'react'
import { translate } from '../../services/translate'

import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#004F00',
            contrastText: '#fff',
        },

    },
    status: {
        danger: 'orange',
    },
});

class SettingsPage extends Component {

    state = {
        sandbox: 'cuckoo',
        engines: {
            han: {
                activate: true,
                model: 'skipgram_tfidf',
                as: 'danger'
            },
            virustotal: {
                activate: true,
                as: 'danger',
            },
            cuckoo: {
                activate: true,
                as: 'danger',
            },
            asm_cnn: {
                activate: false,
                as: 'critical',
            },
            asm_lstm: {
                activate: false,
                as: 'critical',
            },
            bytes_cnn: {
                activate: false,
                as: 'critical',
            },
            bytes_lstm: {
                activate: false,
                as: 'critical',
            },
            img: {
                activate: false,
                as: 'critical',
            },
            ngram: {
                activate: false,
                as: 'critical',
            }
        },
    }

    handleChange_radio = (event) => {
        let key = event.target.name.split('__')
        let val_0 = this.state[key[0]]
        for (let i = 1; i < key.length - 1; i++) {
            console.log('~~ call update', key, val_0[key[i]], key[i + 1])
            val_0 = this.update(val_0[key[i]], key[i + 1], event.target.value)
        }
        let k = key[0]
        console.log('~~ key', key.length, key, k, val_0)
        this.setState({ k: val_0 })
    }

    handleChange_checkbox = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        let key = event.target.name.split('__')
        let val_0 = this.state[key[0]]
        for (let i = 1; i < key.length - 1; i++) {
            console.log('~~ call update', key, val_0[key[i]], key[i + 1])
            val_0 = this.update(val_0[key[i]], key[i + 1], event.target.checked)
        }
        let k = key[0]
        console.log('~~ key', key.length, key, k, val_0)
        this.setState({ k: val_0 })
    };

    update = (obj, key, val) => {
        if (typeof obj[key] !== 'object') {
            obj[key] = val
        } else {

        }
        console.log('~~ update called', obj, key)
        return obj;
    }

    render() {

        return (
            <MuiThemeProvider theme={theme}>
                <div className='SettingsPage'>
                    <h1 className='PageTitle'>{translate['Settings']}</h1>

                    {/*<div class="cardo">
                        <div class="cardo-header">
                            <h3 id="title">{translate['Basic settings']}</h3>
                        </div>
                        <div class="cardo-content">
                            <div class="rows">
                                <a class="label">{translate['Sandbox']}</a>
                                <div class="value">
                                    <RadioGroup name="sandbox" value={this.state.sandbox} onChange={this.handleChange_radio} class="han-models-list">
                                        <FormControlLabel value="cuckoo" control={<Radio disabled={false} color="primary" />} label="Cuckoo" />
                                    </RadioGroup>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>*/}


                    <div class="cardo">
                        <div class="cardo-header">
                            <h3 id="title">{translate['Engines']}</h3>
                        </div>
                        <div class="cardo-content">
                            {/* HAN detector */}
                            <div class="rows">
                                <h5 class="label">{translate['HAN']}</h5>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['han']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__han__activate" color="primary" />} label="Activate this engine" />

                                    <div class="rows">
                                        <a class="label">Model</a>
                                        <div class="value">
                                            <RadioGroup name="engines__han__model" value={this.state.engines['han']['model']} onChange={this.handleChange_radio} class="han-models-list">
                                                <FormControlLabel value="skipgram_tfidf" control={<Radio disabled={this.state.engines['han']['activate'] == false ? true : false} color="primary" />} label="Skip gram + TF-IDF (no edge-weighing)" />
                                                <FormControlLabel value="skipgram_tfidf_noedgew" control={<Radio disabled={this.state.engines['han']['activate'] == false ? true : false} color="primary" />} label="Skip gram + TF-IDF (no edge-weighing)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>

                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__han__as" value={this.state.engines['han']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['han']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['han']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['han']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>

                                <div class="clearfix"></div>
                            </div>

                            {/* VirusTotal detector */}
                            <div class="rows">
                                <a class="label">{translate['VirusTotal']}</a>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['virustotal']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__virustotal__activate" color="primary" />} label="Activate this engine" />
                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__virustotal__as" value={this.state.engines['virustotal']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['virustotal']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['virustotal']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['virustotal']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                            {/* Cuckoo detector */}
                            <div class="rows">
                                <a class="label">{translate['Cuckoo']}</a>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['cuckoo']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__cuckoo__activate" color="primary" />} label="Activate this engine" />
                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__cuckoo__as" value={this.state.engines['cuckoo']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['cuckoo']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['cuckoo']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['cuckoo']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                            {/* asm_cnn detector */}
                            <div class="rows">
                                <a class="label">{translate['asm_cnn']}</a>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['asm_cnn']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__asm_cnn__activate" color="primary" />} label="Activate this engine" />
                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__asm_cnn__as" value={this.state.engines['asm_cnn']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['asm_cnn']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['asm_cnn']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['asm_cnn']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                            {/* asm_lstm detector */}
                            <div class="rows">
                                <a class="label">{translate['asm_lstm']}</a>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['asm_lstm']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__asm_lstm__activate" color="primary" />} label="Activate this engine" />
                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__asm_lstm__as" value={this.state.engines['asm_lstm']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['asm_lstm']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['asm_lstm']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['asm_lstm']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                            {/* bytes_cnn detector */}
                            <div class="rows">
                                <a class="label">{translate['bytes_cnn']}</a>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['bytes_cnn']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__bytes_cnn__activate" color="primary" />} label="Activate this engine" />
                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__bytes_cnn__as" value={this.state.engines['bytes_cnn']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['bytes_cnn']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['bytes_cnn']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['bytes_cnn']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                            {/* bytes_lstm detector */}
                            <div class="rows">
                                <a class="label">{translate['bytes_lstm']}</a>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['bytes_lstm']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__bytes_lstm__activate" color="primary" />} label="Activate this engine" />
                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__bytes_lstm__as" value={this.state.engines['bytes_lstm']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['bytes_lstm']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['bytes_lstm']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['bytes_lstm']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                            {/* img detector */}
                            <div class="rows">
                                <a class="label">{translate['img']}</a>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['img']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__img__activate" color="primary" />} label="Activate this engine" />
                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__img__as" value={this.state.engines['img']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['img']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['img']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['img']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>

                            {/* ngram detector */}
                            <div class="rows">
                                <a class="label">{translate['ngram']}</a>
                                <div class="valuess value">
                                    <FormControlLabel control={<Checkbox checked={this.state.engines['ngram']['activate']} onChange={this.handleChange_checkbox} disabled={false} name="engines__ngram__activate" color="primary" />} label="Activate this engine" />
                                    <div class="rows">
                                        <a class="label">Treat detected as</a>
                                        <div class="value">
                                            <RadioGroup name="engines__ngram__as" value={this.state.engines['ngram']['as']} onChange={this.handleChange_radio}>
                                                <FormControlLabel value="danger" control={<Radio disabled={this.state.engines['ngram']['activate'] == false ? true : false} color="primary" />} label="Danger" />
                                                <FormControlLabel value="critical" control={<Radio disabled={this.state.engines['ngram']['activate'] == false ? true : false} color="primary" />} label="Warning (Critical)" />
                                                <FormControlLabel value="normal" control={<Radio disabled={this.state.engines['ngram']['activate'] == false ? true : false} color="primary" />} label="Normal (Benign)" />
                                            </RadioGroup>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>


                        </div>
                    </div>

                </div>

                <div class="buttons-submit">
                <div class="col-lg-6"></div>
                <div class="col-lg-6">
                    <Button variant="contained" color="primary">
                        Save
                    </Button>
                </div>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default SettingsPage