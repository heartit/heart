# Heart 

A smart contract for **HeartIt** project where we are creating a Heart full of emotions for the web.

## Links 

[HeartIt Website](https://heartit.netlify.app)

[HeartIt Blog](https://heartit.netlify.app/blog)

[Heart-UI Demo Video](https://www.youtube.com/watch?v=w0gm83aPCp4)

## Track List

- [x] `addBeat` function that inputs data as a string and a rhythm as an integer, and emits `BeatAdded` event <sup>*(completed on Feb 25, 2023)*</sup>
- [x] `reward` function which inputs an array of beats (Heartbeats) with the `Beat` structure and an amount of ether to pay the accurate Hearters <sup>*(completed on Feb 27, 2023)*</sup>
- [x] `getBeats` function which gets a string as data and returns an array of `Beat`s <sup>*(completed on Feb 27, 2023)*</sup>
- [x] `getAllBeats` function which returns all the beats as an array of `Beat`s <sup>*(completed on Feb 27, 2023)*</sup>
- [x] complete the unit testing for `Heart.sol` contract <sup>*(completed on Mar 12, 2023)*</sup>
- [x] complete deploy files to create constants for the front-end <sup>*(completed on Mar 4, 2023)*</sup> 
- [x] add verification script in `utils` dir <sup>*(completed on Mar 4, 2023)*</sup>
- [x] add `HeartEarth.sol` as Heart-based dApp showcase <sup>*(completed on Mar 5, 2023)*</sup>
- [ ] add advanced emotion structures to use as storage, i.e. advanced `Beat` struct 
- [ ] update from `string` type to `bytes` to fit the new structure
- [ ] accept large files as data using IPFS
- [ ] secure the Heart contract 
    - [ ] review and design proper access controls
    - [ ] add more guardian statements to operations
    - [ ] verify code correctness before publication
    - [ ] ask for an independent review of your code
    - [ ] implement robust disaster recovery plans
    - [ ] design secure governance systems
    - [ ] minimize code complexity
    - [ ] defend against common smart contract vulnerabilities
