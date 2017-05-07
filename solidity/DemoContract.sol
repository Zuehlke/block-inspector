pragma solidity ^0.4.1;

contract DemoContract {

    uint32 counter = 0;
    bytes32[] data;
    mapping(uint256 => bytes32) entries;

    function invalidJump() {
        throw; //
    }

    function outOfGas() {
        for(uint256 i=0;i<1000000000;i++){
            data.push("some data");
        }
    }

    function addEntry(uint256 key, bytes32 data) returns (bool _success) {
        entries[key] = data;
        _success = true;
    }

    function incrementCounter() returns (uint32 _counter) {
        counter++;
        _counter = counter;
    }

    function getCounter() constant returns (uint32 _counter) {
        _counter = counter;
    }

    function getEntry(uint256 key) constant returns (bytes32 _entry) {
        _entry = entries[key];
    }
}