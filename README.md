# Navigator

[![Apache License, Version 2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0) [![Build Status](https://travis-ci.org/aperture-sh/navigator.svg?branch=master)](https://travis-ci.org/aperture-sh/navigator) [![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/ap3rture/navigator)](https://hub.docker.com/r/ap3rture/navigator)

![navigator](https://github.com/aperture-sh/navigator/raw/master/public/screenshot.png "Navigator Screenshot")

## Configuration

`./public/config.json` contains configurations for the main tank and exhauster endpoint along with an optional MapBox Access key to make the geocoder work.

## Quickstart

* Create `config.json`
* Run container and mount config file: `docker run --rm -it --name navigator --link tank -v /opt/navigator/config.json:/usr/share/nginx/html/config.json ap3rture/navigator:latest`

## Deployment

For production enviroments see our provisioning scripts using [Ansible](https://github.com/aperture-sh/tank-ansible) and [Terraform](https://github.com/aperture-sh/tank-terraform).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Requests to `/tank`  and `/exhauster` will be proxied to the ip address set in `package.json` using the `proxy` property.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>

License
-------

Navigator is licensed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
