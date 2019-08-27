IMAGE := $(TRAVIS_REPO_SLUG):latest

image:
	docker build -t $(IMAGE) .

push-image:
	docker push $(IMAGE)


.PHONY: image push-image
