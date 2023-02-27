// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Heart {
    event BeatAdded();
    address public owner;

    struct Beat {
        // to-do: add timestamp
        string data;
        address addr;
        uint256 rhythm;
        uint256 goalRhythm;
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
        dataToBeat[_data].push(
            Beat({data: _data, addr: _addr, rhythm: _rhythm, goalRhythm: 0})
        );
        emit BeatAdded();
    }

    function getBeats(string memory _data) public view returns (Beat[] memory) {
        return dataToBeat[_data];
    }

    function reward(Beat[] memory _beats) public payable {
        require(msg.value > 0, "[ERR] Message value is not positive.");
        require(_beats.length > 0, "[ERR] Requires an array of Beats.");

        uint256 signleReward = msg.value / _beats.length;

        for (uint256 i = 0; i < _beats.length; i++) {
            (bool sent, ) = _beats[i].addr.call{value: signleReward}("");
            require(sent, "[ERR] ETH tranfer failed.");
        }
    }
}
