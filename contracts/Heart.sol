// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Heart {
    event BeatAdded();

    struct Beat {
        address addr;
        string data;
        uint256 rhythm;
    }

    Beat[] public beats;

    function addBeat(
        address _addr,
        string memory _data,
        uint256 _rhythm
    ) public {
        beats.push(Beat({addr: _addr, data: _data, rhythm: _rhythm}));
        emit BeatAdded();
    }
}
