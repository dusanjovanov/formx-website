/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

class Footer extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Copyright @ {new Date().getFullYear()} Formx - Dusan Jovanov
      </div>
    );
  }
}

module.exports = Footer;
