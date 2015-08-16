angular.module('app').controller("taxidetails", function (taxiObject, $scope, $ionicModal, $ionicListDelegate, $ionicPopup,$ionicLoading ,$http) {



    //get the taxi object from the service
    //watch our taxi object for changes
    $scope.$watch(function () {
            return taxiObject.current_record; //what we want to watch
        },
        function(newVal, oldVal) {
            //set the update record to true if this record has been updated make sure its the same record we are verifying
            taxiObject.updated =  (oldVal != null && newVal.id == oldVal.id && newVal != oldVal)

            if (taxiObject.updated){
                console.log("need to update object to server");
                taxiObject.updateRecord(newVal);
                $scope.saveTaxi(newVal);
            }
        }, true);


    //pass our taxi object to view
    $scope.taxi_info = taxiObject.current_record;
    console.log("rendering taxiObject",taxiObject.current_record)
   //create a modal for editing/adding the name
    $ionicModal.fromTemplateUrl('edit-name-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })
    $scope.openModal = function() {
        $scope.modal.show()
    };

    console.log("isbanned",taxiObject.current_record.isbanned)
    //Get the banned flag
    $scope.isbanned = taxiObject.current_record.isbanned;


    //Set the banflag
    $scope.setbanaction = function (banaction) {
        //searchresults.taxiObject.isbanned = banaction;
        //get current
        taxiObject.current_record.isbanned = banaction;


        //Check the object and the ban flag is now set
        console.log("Updated Object:", taxiObject.current_record)
    }
    //show error
    $scope.showAlert = function ($message) {
        var alertPopup = $ionicPopup.alert({
            title: 'Update failed',
            template: $message
        });
    }


    //close the modal and add the new name
    $scope.closeModal = function (name) {
      //did we get a name, I will do some regex for this
        if (typeof name == "undefined") {
            $scope.showAlert("Incorrect Name Provided")
            return false; 
        }

        if (name.trim().length <= 2) {
            $scope.showAlert("Not a valid name")
            return false;
        }

        taxiObject.current_record.name = name;
        $ionicListDelegate.closeOptionButtons();


        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        //check if any changes in the taxi object we need to add a previous state to the taxi service
        console.log("destroyed");
        $scope.modal.remove();
    });
    //************show and hide boxs for saving ***********/
    $scope.show = function () {
        $ionicLoading.show({
            template: 'Updating...'
        });
    };
    $scope.hide = function () {
        $ionicLoading.hide();
    };

    //************save taxi record***********/
    $scope.saveTaxi = function(taxiObject){
        $scope.show();

        $http.jsonp(api.call('saveDetails'), {
                params: {
                    taxi: taxiObject

                }
            }
        ).success(function (response, status, headers, config) {

                setTimeout(function () { $scope.hide(); }, 100)

            }).error(function (response, status, headers, config) {
                console.log("error data", response);
                $scope.hide = function () {
                    $ionicLoading.hide();
                };
            })
    };

});