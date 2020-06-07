import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
describe('FirebaseService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FirebaseService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=firebase.service.spec.js.map