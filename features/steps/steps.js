const { Given, When, Then } = require("@cucumber/cucumber");
const { spec, expect, notNull, includes } = require("pactum");
const assert = require("assert");

Given('user makes get request to API {string}', async function(url) {
     this.response = await spec().get(url);
  });

Then('the HTTP status code of the response is {int}', function (statuCode) {
    expect(this.response).to.have.status(statuCode);
  });
  
Then('the response time of the request is below {int} milliseconds', function (expectedTime) {
    expect(this.response).to.have.responseTimeLessThan(expectedTime);
  });
  
Then("value of id is not null or empty for any schedule data", function () {
    this.response.json.schedule.elements.forEach(scheduleData => {
      if(scheduleData.id!= null)
        assert(scheduleData.id.length > 0,"Episode Id is empty");
      else
        assert(scheduleData.id.notEqual(null), "Episode Id is null");
    });
  });

Then("episode type for every item must be {string}", function (episodeType) { 
    this.response.json.schedule.elements.forEach(scheduleData => {
       assert.deepStrictEqual(scheduleData.episode.type,episodeType,"Episode type is incorrect for episode with id "+scheduleData.episode.id);
       
    });
 });

Then("the title field in episode, is never null or empty for any schedule item", function () { 
  this.response.json.schedule.elements.forEach(scheduleData => {
    if(scheduleData.episode.title!= null)
      assert(scheduleData.episode.title.length > 0, "Title of episode with id "+scheduleData.episode.id+" is appearing empty");
    else
      assert(scheduleData.episode.title.notEqual(null),"Title of episode with id "+scheduleData.episode.id+" is null");
  });
});

Then("only one episode in the list of episodes has value true for live", function () { 
  var liveCount=0;   
  this.response.json.schedule.elements.forEach(scheduleData => {
  if(scheduleData.episode.live == true)
      liveCount++;
  });
  assert(liveCount == 1,"Episode live status is incorrect for one or more episodes");
});

Then("the transmission_start date value is before the transmission_end date", function () {
  this.response.json.schedule.elements.forEach(scheduleData => {
    assert.ok(scheduleData.transmission_start < scheduleData.transmission_end);
  });
});

Then("date valule in response headers appears correctly", function () {
  console.log(": Test data :"+this.response.headers);
 


});

Then("API response error object has the properties details and http_response_code", function () { 
  if(this.response.json.error){
    assert(this.response.json.error.details,"API response error object does not has property 'details'");
    assert(this.response.json.error.http_response_code,"API response error object does not has property 'http_response_code'");
  }else{
    assert(false,"API response does not return error object");
  }
});