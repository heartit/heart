// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./Heart.sol";

contract HeartEarth {
    Heart public heart;

    constructor(address heartAddr) {
        heart = Heart(heartAddr);
    }

    function leaveIt(string memory _data) public view returns (bool) {
        Heart.Beat[] memory beats = heart.getBeats(_data);
        uint256 good = 90000000;
        uint256 bad = 9000000;
        uint256 goodCounter = 0;
        uint256 badCounter = 0;
        for (uint256 i = 0; i < beats.length; i++) {
            if (beats[i].rhythm == good) goodCounter++;
            else if (beats[i].rhythm == bad) badCounter++;
        }

        if (goodCounter >= badCounter) return true;
        return false;
    }
}
