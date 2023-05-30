import {
  Flex,
  SettingsHR,
  SettingsSection,
  SettingsTitle,
  SettingsText,
  WarningsText,
  Button,
} from '@chia-network/core';
import { Trans } from '@lingui/macro';
import { FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { ipcMain } from 'electron';
import React, { useState } from 'react';

const fs = require('fs');
const yaml = require('js-yaml');
var path;

//

export default function SettingsPeers() {
  const [SavePeersSettings, setSavePeersSettings] = React.useState(false);
  const [ConfPath, setConfPath] = useState('~/.chia/mainnet/testconfig.yaml');
  const [full_target_outbound_peer_count, set_full_target_outbound_peer_count] = useState('2');

  const handleChange = (event) => {
    setConfPath(event.target.value);
  };
  const handleChangeVar = (event) => {
    set_full_target_outbound_peer_count(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    if (ConfPath.trim().length !== 0) {
      let yamlFile = fs.readFileSync(ConfPath, 'utf8', (err) => {
        if (err) {
          console.error;
          return;
        }
      });
      let loadedYaml = yaml.load(yamlFile);
      loadedYaml.full_node.target_outbound_peer_count = full_target_outbound_peer_count;
      console.log(loadedYaml.full_node);

      // fs.writeFile(ConfPath, 'teststring', (err) => {
      //   if (err) {
      //     console.error;
      //     return;
      //   }
      // });
      console.log('input value is: ' + ConfPath);
    } else {
      //console.log('input value is empty');
    }
  };
  var save = document.getElementById('save');
  return (
    <Grid container style={{ maxWidth: '624px' }} gap={3}>
      <Grid item>
        <Flex flexDirection="column" gap={1}>
          <SettingsSection>
            <Trans>Peers</Trans>
          </SettingsSection>
          <SettingsText>
            <h3 style={{ color: 'red' }}>WARNING changes made here may stop synchronisation and other functions</h3>
            <Trans>In this window you can change some yaml settings for peers</Trans>
          </SettingsText>
        </Flex>
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        <SettingsHR />
      </Grid>
      <Grid container>
        <Grid item style={{ width: '400px' }}>
          <SettingsTitle>
            <Trans>location of config.yaml</Trans>
          </SettingsTitle>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <form id="frm1">
            <input
              type="text"
              id="pathToYaml"
              onChange={handleChange}
              placeholder="default /.chia/mainnet/config/testconfig.yaml"
            ></input>
          </form>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <button onClick={handleClick}>load config file</button>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} lg={12}>
        <SettingsHR />
      </Grid>
      <Grid container>
        <Grid item style={{ width: '400px' }}>
          <SettingsTitle>
            <Trans>target outbound peer count:</Trans>
          </SettingsTitle>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <form>
            <TextField
              // label="MiB"
              id="targetoutboundpeers"
              name="maxCacheSize"
              type="number"
              size="small"
              onChange={handleChangeVar}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
            >
              5
            </TextField>
          </form>
          {/* <LimitCacheSize /> */}
        </Grid>
        <Grid item style={{ width: '400px' }}>
          <Button
            onClick={() => setSavePeersSettings(true)}
            variant="outlined"
            data-testid="SettingsPanel-resync-wallet-db"
          >
            <Trans>Save Settings</Trans>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
