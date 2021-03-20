// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./Token.sol";

contract dBank {

  Token private token;
  uint public totalAmt=0;
  uint public withdrawnAmt=0;
  uint public remaining=0;
  address payable public bank=0x59B6db434259C58172386DeE6897614294834D89;

  mapping(address => uint) public depositStart;
  mapping(address => uint) public etherBalanceOf;

  event Deposit(address indexed user, uint etherAmount, uint timeStart);
  event Withdraw(address indexed user, uint etherAmount, uint depositTime, uint interest);

  constructor(Token _token) {
    token = _token;
  }

  function displayTotalAmt() public view returns (uint) {
    return totalAmt;
  }
  function displayWithdrawnAmt() public view returns (uint) {
    return withdrawnAmt;
  }
  function displayRemaining() public view returns (uint) {
    return remaining;
  }

  function deposit() payable public {
    require(msg.value>=1e16, 'Error, deposit must be >= 0.01 ETH');

    etherBalanceOf[bank] = etherBalanceOf[bank] + msg.value;
    totalAmt=totalAmt+msg.value;
    remaining=remaining+msg.value;
    
    //check user's hodl time
    depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

    emit Deposit(msg.sender, msg.value, block.timestamp);
  }

  function withdraw() public {
    require(remaining>0, 'Error, no funds to withdraw');
    uint totalBalance = etherBalanceOf[bank]; //for event
    uint cacheTotalAmt= totalAmt;

    //check user's hodl time
    uint depositTime = block.timestamp - depositStart[msg.sender];

    //send funds to user
    bank.transfer(totalBalance);
    //token.mint(msg.sender, totalAmt); //eth back to user

    //reset depositer data
    depositStart[msg.sender] = 0;
    remaining=0;
    withdrawnAmt= withdrawnAmt + totalBalance;
    etherBalanceOf[bank] = 0;

    emit Withdraw(msg.sender, totalBalance, depositTime, cacheTotalAmt);
  }

}