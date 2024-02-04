import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Nat32 "mo:base/Nat32";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor {

    /*
    My canister is gonna have the next functions
    [x] createTask
    [x] getTasks
    [] deleteTask
    [x] setTask
    */

    type Task = {
		creator: Text;
		task: Text;
		done: Bool;
	};

    stable var taskId: Nat32 = 0;
    let taskList = HashMap.HashMap<Text, Task>(0, Text.equal, Text.hash);

    private func generatePostId(): Nat32 {
		taskId += 1;
		return taskId;
	};

    public shared (msg) func createTask ( taskDescription: Text ): async () {
        let newTask = {
            creator = Principal.toText(msg.caller);
            task    = taskDescription;
            done    = false;
        };

        taskList.put( Nat32.toText(generatePostId()) , newTask );
		Debug.print("New task created! ID: " # Nat32.toText(taskId));
		return ();
    };

    public query func getTasks () : async [(Text, Task)] {
		return  Iter.toArray(taskList.entries());
	};

    public shared func setTask ( taskId: Text ) : async Bool {
		let task: ?Task = taskList.get( taskId );
        
        switch ( task ) {
            case (null) {
                return false;
            };
            case ( ?taskValue ) {
                let updateTask: Task = {
                    creator = taskValue.creator;
                    task = taskValue.task;
                    done = not taskValue.done;
                };

                taskList.put(taskId, updateTask);
                return true;
            };
        };

	};

}