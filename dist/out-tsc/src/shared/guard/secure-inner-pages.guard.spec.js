import { TestBed } from '@angular/core/testing';
import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
describe('SecureInnerPagesGuard', () => {
    let guard;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(SecureInnerPagesGuard);
    });
    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
//# sourceMappingURL=secure-inner-pages.guard.spec.js.map