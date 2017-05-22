pragma solidity ^0.4.1;

contract DemoContract {

    uint32 counter = 0;
    bytes32[] data;
    mapping(uint256 => bytes32) entries;

    event newDataEvent(uint256 key, bytes32 data);
    event counterIncrementEvent(uint32 counter);

    function invalidJump() {
        throw; //
    }

    function outOfGas() {
        for(uint256 i=0;i<1000000000;i++){
            data.push("some data");
        }
    }

    function addEntry(uint256 key, bytes32 data) payable returns (bool _success) {
        entries[key] = data;
        _success = true;
        newDataEvent(key, data);
    }

    function incrementCounter() payable returns (uint32 _counter) {
        counter++;
        _counter = counter;
        counterIncrementEvent(_counter);
    }

    function getCounter() constant returns (uint32 _counter) {
        _counter = counter;
    }

    function getEntry(uint256 key) constant returns (bytes32 _entry) {
        _entry = entries[key];
    }
}