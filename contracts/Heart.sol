// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Heart {
    event BeatAdded();
    address public owner;

    struct Beat {
        // to-do: add timestamp
        address addr;
        uint256 rhythm;
    }

    mapping(string => Beat[]) dataToBeat;

    constructor() {
        owner = msg.sender;
    }

    function addBeat(
        address _addr,
        string memory _data,
        uint256 _rhythm
    ) public {
        // to-do: add timestamp when pushing beat
        require(_rhythm >= 0 && _rhythm <= 9999999, "[ERR]");
        dataToBeat[_data].push(Beat({addr: _addr, rhythm: _rhythm}));
        emit BeatAdded();
    }

    function getBeats(string memory _data) public view returns (Beat[] memory) {
        return dataToBeat[_data];
    }

    function reward(
        string[] memory _data,
        uint256[] memory _rhythm,
        bool _success
    ) public payable {
        require(_success == true, "[ERR]");
        require(_data.length == _rhythm.length, "[ERR2]");
        for (uint256 i = 0; i < _data.length; i++) {
            Beat[] memory beats = getBeats(_data[i]);
            for (uint256 j = 0; j < beats.length; j++) {
                if (beats[j].rhythm == _rhythm[i]) {
                    (bool sent, ) = beats[j].addr.call{
                        value: 1000000000000000000
                    }("");
                    require(sent, "[ERR3]");
                }
            }
        }
    }
}
