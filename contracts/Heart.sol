// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Heart {
    event BeatAdded();

    struct Beat {
        // to-do: add timestamp
        address addr;
        uint256 rhythm;
    }

    mapping(string => Beat[]) dataToBeat;

    function addBeat(
        address _addr,
        string memory _data,
        uint256 _rhythm
    ) public {
        // to-do: add timestamp when pushing beat
        dataToBeat[_data].push(Beat({addr: _addr, rhythm: _rhythm}));
        emit BeatAdded();
    }

    function getBeats(string memory _data) public view returns (Beat[] memory) {
        return dataToBeat[_data];
    }
}
