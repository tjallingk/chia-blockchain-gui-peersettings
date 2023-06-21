import {
  Flex,
  SettingsHR,
  SettingsSection,
  SettingsText,
  Button,
  TooltipIcon,
  SettingsLabel,
} from '@chia-network/core';
import { Trans } from '@lingui/macro';
import { Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const fs = require('fs');

const yamljs = require('js-yaml');

export default function SettingsPeers() {
  const [ConfPath, SetConfPath] = useState('/home/none/config.yaml');

  let FullTargetOutboundPeerCount = '';
  let FullDbReaders = '';
  let FullMaxInboundFarmer = '';
  let FullMaxInboundWallet = '';
  let FullPeerConnectInterval = '';
  let FullPeerConnectTimeout = '';
  let FullTargetPeerCount = '';
  let yamlFile = '';

  const HandleChange = (event) => {
    SetConfPath(event.target.value);
  };
  const HandleChangeFullTargetOutboundePeerCount = (event) => {
    const value = !Number.isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : null;
    FullTargetOutboundPeerCount = value;
  };
  const HandleChangeFullDbReaders = (event) => {
    const value = !Number.isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : null;
    FullDbReaders = value;
  };
  const HandleChangeFullMaxInboundFarmer = (event) => {
    const value = !Number.isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : null;
    FullMaxInboundFarmer = value;
  };
  const HandleChangeFullMaxInboundWallet = (event) => {
    const value = !Number.isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : null;
    FullMaxInboundWallet = value;
  };
  const HandleChangeFullPeerConnectInterval = (event) => {
    const value = !Number.isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : null;
    FullPeerConnectInterval = value;
  };
  const HandleChangeFullPeerConnectTimeout = (event) => {
    const value = !Number.isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : null;
    FullPeerConnectTimeout = value;
  };
  const HandleChangeFullTargetPeerCount = (event) => {
    const value = !Number.isNaN(event.target.valueAsNumber) ? event.target.valueAsNumber : null;
    FullTargetPeerCount = value;
  };

  const HandleClickLoad = () => {
    if (ConfPath.trim().length !== 0) {
      try {
        yamlFile = fs.readFileSync(ConfPath, 'utf8');
      } catch (error) {
        document.getElementById('ErrorLoad').innerHTML = error.message;
        return;
      }

      if (!yamlFile) {
        return;
      }
      const loadedYaml = yamljs.load(yamlFile);
      FullTargetOutboundPeerCount = loadedYaml.full_node.target_outbound_peer_count;
      FullDbReaders = loadedYaml.full_node.db_readers;
      FullMaxInboundFarmer = loadedYaml.full_node.max_inbound_farmer;
      FullMaxInboundWallet = loadedYaml.full_node.max_inbound_wallet;
      FullPeerConnectInterval = loadedYaml.full_node.peer_connect_interval;
      FullPeerConnectTimeout = loadedYaml.full_node.peer_connect_timeout;
      FullTargetPeerCount = loadedYaml.full_node.target_peer_count;
      if (document.getElementById('targetoutboundpeers')) {
        document.getElementById('targetoutboundpeers').value = FullTargetOutboundPeerCount;
      }

      if (document.getElementById('DBReaders')) {
        document.getElementById('DBReaders').value = FullDbReaders;
      }

      if (document.getElementById('fullMaxInboundFarmers')) {
        document.getElementById('fullMaxInboundFarmers').value = FullMaxInboundFarmer;
      }
      if (document.getElementById('fullMaxInboundWallet')) {
        document.getElementById('fullMaxInboundWallet').value = FullMaxInboundWallet;
      }
      if (document.getElementById('fullPeerConnectInterval')) {
        document.getElementById('fullPeerConnectInterval').value = FullPeerConnectInterval;
      }
      if (document.getElementById('fullPeerConnectTimeout')) {
        document.getElementById('fullPeerConnectTimeout').value = FullPeerConnectTimeout;
      }
      if (document.getElementById('fullTargetPeerCount')) {
        document.getElementById('fullTargetPeerCount').value = FullTargetPeerCount;
      }
    } else {
      document.getElementById('ErrorLoad').innerHTML = 'No config path given';
    }
  };

  const HandleSave = () => {
    if (ConfPath.trim().length !== 0) {
      try {
        yamlFile = fs.readFileSync(ConfPath, 'utf8');
      } catch (error) {
        document.getElementById('ErrorLoad').innerHTML = error.message;
        return;
      }

      const loadedYaml = yamljs.load(yamlFile);
      loadedYaml.full_node.target_outbound_peer_count = FullTargetOutboundPeerCount;
      loadedYaml.full_node.db_readers = FullDbReaders;
      loadedYaml.full_node.max_inbound_farmer = FullMaxInboundFarmer;

      const yamlstring = yamljs.dump(loadedYaml);
      fs.writeFile(ConfPath, yamlstring, (err) => {
        if (err) {
          document.getElementById('ErrorLoad').innerHTML = err.message;
        }
      });
    } else {
      document.getElementById('ErrorLoad').innerHTML = 'No config path given';
    }
  };

  return (
    <Grid container style={{ maxWidth: '724px' }} gap={3}>
      <Grid item>
        <Flex flexDirection="column" gap={1}>
          <SettingsSection>{/* <Trans>Peers</Trans> */}</SettingsSection>
          {/* TODO: fix Trans */}
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
        <Grid item style={{ width: '600px' }}>
          <SettingsLabel>
            <Flex gap={1} alignItems="center">
              <Trans>location of config.yaml</Trans>
            </Flex>
          </SettingsLabel>
        </Grid>

        <Grid item s justifyContent="flex-end">
          <TextField id="pathToYaml" onChange={HandleChange} />
        </Grid>
        <Grid item style={{ width: '600px' }} justifyContent="flex-end">
          <Button onClick={HandleClickLoad} variant="outlined">
            <Trans>load config file</Trans>
          </Button>
          <p id="ErrorLoad" style={{ color: 'red' }} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} lg={12}>
        <SettingsHR />
      </Grid>

      <Grid container>
        <Grid item style={{ width: '600px' }}>
          <SettingsLabel>
            <Flex gap={1} alignItems="center">
              <Trans>target outbound peer count:</Trans>
              <TooltipIcon>
                <Trans>
                  Initiate outbound connections until this number is hit. Increasing may speed up sync as long as your
                  machine is powerful enough
                </Trans>
              </TooltipIcon>
            </Flex>
          </SettingsLabel>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <form>
            <TextField
              id="targetoutboundpeers"
              name="TargetOutbountPeerCount"
              type="number"
              size="small"
              onChange={HandleChangeFullTargetOutboundePeerCount}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
            />
          </form>
        </Grid>
        <Grid item style={{ width: '600px' }}>
          <SettingsLabel>
            <Flex gap={1} alignItems="center">
              <Trans>Full Node DB Readers:</Trans>
              <TooltipIcon>
                <Trans>
                  The number of threads used to read from the wallet database concurrently. There's always only 1
                  writer, but the number of readers is configurable. Increasing might speed up the Read times but wont
                  help if your machine can't handle it(machine is lacking cores).
                </Trans>
              </TooltipIcon>
            </Flex>
          </SettingsLabel>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <TextField
            id="DBReaders"
            name="DBreaders"
            type="number"
            size="small"
            onChange={HandleChangeFullDbReaders}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
        <Grid item style={{ width: '600px' }}>
          <SettingsLabel>
            <Flex gap={1} alignItems="center">
              <Trans>Full Node max inbound farmer:</Trans>
              <TooltipIcon>
                <Trans>Maximum number of peers accepted for the farmer.</Trans>
              </TooltipIcon>
            </Flex>
          </SettingsLabel>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <TextField
            id="fullMaxInboundFarmers"
            name="fullMaxInboundFarmers"
            type="number"
            size="small"
            onChange={HandleChangeFullMaxInboundFarmer}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>

        <Grid item style={{ width: '600px' }}>
          <SettingsLabel>
            <Flex gap={1} alignItems="center">
              <Trans>Full Node max inbound wallet:</Trans>
              <TooltipIcon>
                <Trans>Maximum number of peers accepted for the wallet.</Trans>
              </TooltipIcon>
            </Flex>
          </SettingsLabel>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <TextField
            id="fullMaxInboundWallet"
            name="fullMaxInboundWallet"
            type="number"
            size="small"
            onChange={HandleChangeFullMaxInboundWallet}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>

        <Grid item style={{ width: '600px' }}>
          <SettingsLabel>
            <Flex gap={1} alignItems="center">
              <Trans>Full Node peer connect interval:</Trans>
              <TooltipIcon>
                <Trans>How often to initiate outbound connections to other full nodes.</Trans>
              </TooltipIcon>
            </Flex>
          </SettingsLabel>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <TextField
            id="fullPeerConnectInterval"
            name="fullPeerConnectInterval"
            type="number"
            size="small"
            onChange={HandleChangeFullPeerConnectInterval}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>

        <Grid item style={{ width: '600px' }}>
          <SettingsLabel>
            <Flex gap={1} alignItems="center">
              <Trans>Full Node peer connect timeout:</Trans>
              <TooltipIcon>
                <Trans>How long to wait for a peer connection.</Trans>
              </TooltipIcon>
            </Flex>
          </SettingsLabel>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <TextField
            id="fullPeerConnectTimeout"
            name="fullPeerConnectTimeout"
            type="number"
            size="small"
            onChange={HandleChangeFullPeerConnectTimeout}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>

        <Grid item style={{ width: '600px' }}>
          <SettingsLabel>
            <Flex gap={1} alignItems="center">
              <Trans>Full Node Target Peer Count:</Trans>
              <TooltipIcon>
                <Trans>Accept peers until this number of connections.</Trans>
              </TooltipIcon>
            </Flex>
          </SettingsLabel>
        </Grid>
        <Grid item container xs justifyContent="flex-end">
          <TextField
            id="fullTargetPeerCount"
            name="fullTargetPeerCount"
            type="number"
            size="small"
            onChange={HandleChangeFullTargetPeerCount}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>

        <Grid item style={{ width: '600px' }}>
          <Button onClick={HandleSave} variant="outlined" data-testid="SettingsPanel-resync-wallet-db">
            <Trans>Save Settings</Trans>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
