angular.module('app').controller("taxidetails", function (searchresults, $scope, $ionicModal, $ionicListDelegate, $ionicPopup) {

    //get the taxi object from the service

    $scope.taxi_info = searchresults.taxiObject;

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
    $scope.banaction = searchresults.taxiObject.banned;

    //Set the banflag
    
    $scope.setbanaction = function (banaction) {
        searchresults.taxiObject.isbanned = banaction;
        //Check the object and the ban flag is now set
        console.log("Updated Object:", searchresults.taxiObject)
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


        searchresults.taxiObject.name = name;
        $ionicListDelegate.closeOptionButtons();


        $scope.modal.hide();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });


});