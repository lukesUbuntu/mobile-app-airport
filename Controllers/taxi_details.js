angular.module('app').controller("taxidetails", function (taxiObject, $scope, $ionicModal, $ionicListDelegate, $ionicPopup) {

    //get the taxi object from the service
    //watch our taxi object for changes
    $scope.$watch(function () {
            return taxiObject.record;
        },
        function(newVal, oldVal) {
            //set the update record to true if this record has been updated
            taxiObject.updated =  (oldVal != null && newVal != oldVal)
        }, true);


    //pass our taxi object to view
    $scope.taxi_info = taxiObject.current_record;

   //create a modal for editing/adding the name
    $ionicModal.fromTemplateUrl('edit-name-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal
    })
    $scope.openModal = function() {
        $scope.modal.show()
    }
    //Get the banned flag
    $scope.banaction = taxiObject.record.banned;

    //Set the banflag
    
    $scope.setbanaction = function (banaction) {
        //searchresults.taxiObject.isbanned = banaction;
        //get current

        taxiObject.record.isbanned = banaction;


        //Check the object and the ban flag is now set
        console.log("Updated Object:", taxiObject.record)
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

        taxiObject.record.name = name;
        $ionicListDelegate.closeOptionButtons();


        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        //check if any changes in the taxi object we need to add a previous state to the taxi service
        console.log("destroyed")
        if (taxiObject.updated){
            console.log("need to send taxiObject back to server")
        }
        $scope.modal.remove();
    });


});