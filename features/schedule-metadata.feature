Feature: Schedule Metadata
As a Test team member wants to validate the schedule metadata

Scenario: API functioning
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then the HTTP status code of the response is 200
And the response time of the request is below 1000 milliseconds

Scenario: Id and episode type validation
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then value of id is not null or empty for any schedule data
And episode type for every item must be "episode"

Scenario: Episode title validation  
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then the title field in episode, is never null or empty for any schedule item

Scenario: Live episode validation
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then only one episode in the list of episodes has value true for live

Scenario: tramsmission date validation
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then the transmission_start date value is before the transmission_end date

Scenario: response header date validation
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest" 
Then date valule in response headers appears correctly

Scenario: Unavailable page validation
Given user makes get request to API "https://testapi.io/api/RMSTest/ibltest/2023-09-11"
Then the HTTP status code of the response is 404
And API response error object has the properties details and http_response_code